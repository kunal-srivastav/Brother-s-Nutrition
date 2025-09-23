import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, getMyOrders } from '../features/orders/orderController';
import { useToastMessage } from '../features/utils/useToastMessage';

function Orders() {
  const dispatch = useDispatch();
  const { myOrders, successMsg, errorMsg } = useSelector(state => state.orders);

  useToastMessage(errorMsg, successMsg);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  return (
    <>
      {myOrders?.length > 0 ? (
        <div className="container mt-4">
          <h2 className="mb-4">My Orders</h2>

          <div className="row g-3">
            {myOrders?.map((order) =>
              order?.orderItems?.map((item) => (
                <div key={item?._id} className="col-12">
                  <div className={`card shadow-sm border-0 mb-3 ${order?.status === 'Cancelled' ? 'opacity-75' : ''}`}>
                    {/* Header */}
                    <div className="card-header d-flex justify-content-between align-items-center bg-light">
                      <div>
                        <h6 className="mb-1">{item?.product?.name || "Product Name"}</h6>
                        <small className="text-muted">
                          Order Date: {new Date(order?.createdAt).toLocaleString()}
                        </small>
                      </div>
                      <div>
                        <span className="badge bg-primary text-uppercase me-2">
                          {order?.paymentMethod?.toUpperCase()}
                        </span>
                        <span className={`badge ${
                          order?.status === "Pending" ? "bg-warning" :
                          order?.status === "Delivered" ? "bg-success" :
                          order?.status === "Cancelled" ? "bg-danger" : "bg-info"
                        }`}>
                          {order?.status}
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="card-body d-flex align-items-center">
                      <img
                        loading="lazy"
                        src={item?.product?.images?.[0] || "/placeholder.png"}
                        alt={item?.product?.name || "product"}
                        width={80}
                        className="me-3 rounded shadow-sm"
                      />
                      <div className="flex-grow-1">
                        <p className="mb-1 fw-semibold">
                          ₹{(item?.product?.finalPrice * (item?.quantity || 1)).toLocaleString()}
                          <span className="ms-3 text-warning">Qty: {item?.quantity}</span>
                          <span className="ms-3">Weight: {item?.product?.weight || "N/A"}</span>
                        </p>
                        <p className="mb-0 text-muted">Product ID: {item?.product?._id}</p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="card-footer d-flex flex-wrap justify-content-between align-items-center">
                      <div className="mb-2">
                        <strong>Actions:</strong>
                        <div className="mt-1">
                          <button className="btn btn-sm btn-outline-primary me-2" disabled={order?.status === "Cancelled"} >{order?.status === "Delivered" ? "Returned" : "Track Order"}</button>
                          {order?.status === "Pending" && (
                            <button className="btn btn-sm btn-outline-danger" onClick={() => dispatch(deleteOrder(order?._id))} >Cancel Order</button>
                          )}
                        </div>
                      </div>
                      <div className="fw-semibold mb-2">Total: ₹{order?.totalPrice?.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-5">
          <h5>No orders found</h5>
        </div>
      )}
    </>
  );
}

export default Orders;
