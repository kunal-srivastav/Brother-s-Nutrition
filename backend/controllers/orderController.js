import orderModel from "../models/orderModel.js";
import cartModel from "../models/cartModel.js";

//worked
export const getMyOrders = async (req, res) => {
    try {
        const myOrders = await orderModel.find({user: req?.user._id}).populate("orderItems.product", "images name price discount weight").sort({createdAt: -1});
        if(myOrders?.length === 0) return res.status(400).json({message: "Order not found"});
        return res.status(200)
        .json({
            message: "Successfully fetched orders",
            myOrders
        })
    } catch (err) {
        return res.status({message: "Failed to fetch orders"})
    }
};

// worked
export const createOrder = async (req, res) => {
    const { deliveryData, orderItems, totalPrice } = req.body;
    const { houseNo, street, city, country, zip, paymentMethod } = deliveryData;
    try {
        if(!orderItems || orderItems.length === 0) return res.status(400).json({message: "No order items"});
        if(!houseNo || !street || !city || !country || !zip) return res.status(400).json({message: "Address is required"});

        const address = { houseNo, street, city, zip, country };
        const newOrder = await orderModel.create({user: req?.user._id, address, paymentMethod: paymentMethod, orderItems, totalPrice});
        await cartModel.deleteMany({ user: req.user._id });
        return res
        .status(201)
        .json({
            message: "Successfully order placed",
            newOrder
        });
    } catch (err) {
        return res.status(500).json({message: "Failed to place order"});
    }
};

//worked
export const deleteOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    if(!orderId) return res.status(400).json({message: "Order Id is required"});
    const order = await orderModel.findById(orderId).select("status user");
    if(!order) return res.status(404).json({message: "Order not found"});

    // Ensure only the user who created the order can cancel it
    if (order?.user?.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not permitted to cancel this order" });
    }

    if(order?.status !== "Pending") return res.status(403).json({message: "Order cannot be cancelled"});

    order.status = "Cancelled";
    await order.save();

    return res
    .status(200)
    .json({
      message: "Order cancelled successfully",
      cancelledOrder: order
    });
  } catch (err) {
    return res.status(500).json({message: "Failed to cancel order"});
  }
};

//worked
export const getAdminOrders = async (req, res) => {
  try {
    const adminId = req?.user._id;

    const orders = await orderModel.aggregate([
      { $unwind: "$orderItems" },
      {
        $lookup: {
          from: "products",
          localField: "orderItems.product",
          foreignField: "_id",
          as: "productDetails",
          pipeline: [
            {
              $project: {
                owner: 1,
                images: 1,
                name: 1,
                weight: 1,
                price: 1,
                discount: 1
              },
            },
          ],
        },
      },
      { $unwind: "$productDetails" },
      { $match: { "productDetails.owner": adminId } },
      {
        $group: {
          _id: "$_id",
          user: { $first: "$user" },
          status: { $first: "$status" },
          paymentMethod: { $first: "$paymentMethod" },
          totalPrice: { $first: "$totalPrice" },
          createdAt: { $first: "$createdAt" },
          address: { $first: "$address" },
          orderItems: {
            $push: {
              product: "$productDetails",
              quantity: "$orderItems.quantity",
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          status: 1,
          paymentMethod: 1,
          totalPrice: 1,
          createdAt: 1,
          address: 1,
          orderItems: 1,
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    return res.status(200).json({
      message: "Admin orders",
      orders,
    });
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch user orders" });
  }
};

//worked
export const updateUserOrder = async (req, res) => {
    const { status } = req.body;
    const { orderId } = req.params;
    const adminId = req?.user._id;
    try {
      const allowedStatus = ["Pending", "Confirmed", "Shipped", "Out for Delivery", "Delivered", "Cancelled", "Returned"];
      if(status && !allowedStatus.includes(status)) return res.status(400).json({message: "Invalid status value"})
      const myProductOrder = await orderModel.findById(orderId).populate("orderItems.product", "owner");
      if(!myProductOrder) return res.status(404).json({message: "Order not found"});

      //check ownership
      const isOwner = myProductOrder?.orderItems.every(
        (item) => item?.product?.owner?.toString() === adminId.toString()
      );
      if (!isOwner) {
          return res.status(403).json({ message: "Not permitted to update this order" });
      };
      myProductOrder.status = status;
      const updatedOrder = await myProductOrder.save();

      return res
      .status(200)
      .json({
        message: "Successfully update status",
        updatedOrder
      })
    } catch (err) {
      return res.status(500).json({message: "Failed to update order"});
    }
};

//worked
export const deleteOrderByAdmin = async (req, res) => {
    const { orderId } = req.params;
    try {
      if(!orderId) return res.status(400).json({message: "Order Id is required"});
      const order = await orderModel.findById(orderId);
      if(!order) return res.status(404).json({message: "Order not found"});
      if(!["Cancelled", "Delivered"].includes(order?.status)) return res.status(403).json({message: "Order cannot delete"});
      const deletedOrder = await orderModel.findByIdAndDelete(order?._id);
      return res
      .status(200)
      .json({
        message: "Order deleted successfully",
        deleteOrderId: deletedOrder?._id 
      })
    } catch (err) {
      return res.status(500).json({message: "Failed to delete order"});
    }
};

//in future
export const returnedOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    
  } catch (err) {
    
  }
}