import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrderByAdmin, getAdminOrders, updateUserOrder } from "../features/orders/orderController";
import { toast } from "react-toastify"

function OrdersList() {
  
  const [statuses, setStatuses] = useState({});
  const dispatch = useDispatch();
  const { adminProductOrders } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getAdminOrders());
  }, [dispatch]);

const handleStatus = (orderId) => {
    const newStatus = statuses[orderId];
    if (!newStatus) return;
    dispatch(updateUserOrder({ orderId, status: newStatus }))
      .unwrap()
      .then(() => {
        toast.success(`Order updated to ${newStatus}`);
        dispatch(getAdminOrders()); // refresh list
      })
      .catch(() => toast.error("Failed to update order"));
  };

  const handleDelete = (orderId) => {
    dispatch(deleteOrderByAdmin(orderId))
      .unwrap()
      .then(() => {
        toast.success("Order deleted permanently");
        dispatch(getAdminOrders()); // refresh list
      })
      .catch(() => toast.error("Failed to delete order"));
  };


  return (
    <div className="container mt-4">
      <h2 className="mb-3">My Orders</h2>
      {adminProductOrders?.length > 0 ? (
        adminProductOrders.map((order) => (
          <div key={order._id} className="card mb-3 shadow-sm border-0">
            {/* Header */}
            <div className="card-header bg-light d-flex justify-content-between align-items-center">
              <div>
                <h6 className="mb-1">Order ID: {order._id}</h6>
                <small className="text-muted">
                  Date: {new Date(order.createdAt).toLocaleString()}
                </small>
              </div>
              <div>
                <span className="badge bg-primary text-uppercase me-2">
                  {order.paymentMethod?.toUpperCase()}
                </span>
                <span className="badge bg-success text-uppercase">
                  {order.status}
                </span>
              </div>
            </div>

            {/* Products */}
            <div className="card-body">
              {order.orderItems.map((item) => (
                <div
                  key={item.product._id}
                  className="d-flex align-items-center mb-3"
                >
                  <img
                    loading="lazy"
                    src={item.product?.images?.[0] || "/placeholder.png"}
                    alt={item.product?.name || "product"}
                    width={70}
                    className="me-3 rounded"
                  />
                  <div className="flex-grow-1">
                    <h6 className="mb-1">{item.product?.name}</h6>
                    <p className="mb-0">
                      {item.product?.price} ₹
                      <span className="ms-3 text-warning">Qty: {item.quantity}</span>
                      {item.product?.weight && (
                        <span className="ms-3">{item.product.weight}</span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="card-footer d-flex justify-content-between align-items-center flex-wrap">
              <div className="mb-2">
                <strong>Address:</strong>
                  {order.address ? (
                      <div className="ms-2">
                        <div>{order.address.street}</div>
                        <div>{order.address.city}, {order.address.state} - {order.address.zip}</div>
                        <div>{order.address.country}</div>
                      </div>
                    ) : (
                      "No Address"
                    )} 
              </div>
              <div className="mb-2">
                <select
                  disabled={["Cancelled", "Delivered"].includes(order?.status)}
                  className="form-select"
                  value={statuses[order._id] || order.status} // default to current status
                  onChange={(e) =>
                    setStatuses((prev) => ({ ...prev, [order._id]: e.target.value }))
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Returned">Returned</option>
                </select>
              </div>
              <div className="fw-semibold">Total: {order.totalPrice} ₹</div>
              {statuses[order._id] && (
              <button className="btn btn-success" disabled={statuses[order._id] === order.status} onClick={() => handleStatus(order?._id)} >Save</button>
              )}
              {["Cancelled", "Delivered"].includes(order?.status) && (
              <button className="btn btn-danger" onClick={() => handleDelete(order?._id)} >Delete Order</button>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-5">
          <h5>No orders found</h5>
        </div>
      )}
    </div>
  );
}

export default OrdersList;
