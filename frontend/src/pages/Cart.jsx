import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProductsInCart, toggleProductInCart } from '../features/carts/cartController.jsx';
import { updateQuantity } from '../features/carts/cartSlice';
import { useEffect, useState } from "react";
import { Icon } from "../component/Icons";
import './Cart.css'; // Create a new CSS file similar to About.css

function Cart() {
  const dispatch = useDispatch();
  const { cartItems, totalPrice } = useSelector(state => state.carts);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch(getProductsInCart());
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, [dispatch, cartItems]);

  return (
    <div className="container-fluid py-5">
      <div className={`text-center mb-5 fade-section ${visible ? "visible" : ""}`}>
        <h2 className="display-5 fw-bold mb-2 text-danger">Your Cart</h2>
        <hr className="mx-auto border-2 border-dark" style={{ width: "80px" }} />
      </div>

      {cartItems?.length > 0 ? (
        <div className={`row g-4 fade-section ${visible ? "visible" : ""}`}>
          {/* Cart Items */}
          <div className="col-lg-7">
            {cartItems.map(item => (
              <div key={item._id} className="card mb-3 shadow-sm cart-item-card">
                <div className="row g-0 align-items-center">
                  <div className="col-3">
                    <img
                      loading="lazy"
                      src={item?.product?.images?.[0] || "/default-product.png"}
                      className="img-fluid rounded-start p-2"
                      alt={item?.product?.name || "Product"}
                    />
                  </div>
                  <div className="col-6">
                    <div className="card-body">
                      <h5 className="card-title">{item?.product?.name}</h5>
                      <p className="card-text text-muted mb-1">₹{item?.product?.finalPrice}</p>
                      <p className="card-text"><small className="text-warning">{item?.product?.category}</small></p>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={item?.quantity}
                        className="form-control w-50"
                        onChange={(e) => dispatch(updateQuantity({ itemId: item?._id, quantity: Number(e.target.value) }))}
                      />
                    </div>
                  </div>
                  <div className="col-3 text-center">
                    <Icon
                      name={"Delete"}
                      size={25}
                      className="text-gray-400 hover:text-red-600 cursor-pointer"
                      title="Remove from cart"
                      onClick={() => dispatch(toggleProductInCart({ productId: item?.product?._id }))}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="col-lg-5">
            <div className="card p-4 shadow-lg">
              <h3 className="mb-4">Cart Totals</h3>
              <ul className="list-group list-group-flush mb-3">
                {cartItems.map(item => (
                  <li key={item._id} className="list-group-item d-flex justify-content-between">
                    {item?.product?.name} × {item?.quantity}
                    <span>₹{item?.product?.finalPrice * (item?.quantity || 1)}</span>
                  </li>
                ))}
                <li className="list-group-item d-flex justify-content-between">
                  Shipping Charge:
                  <span className="text-success">FREE</span>
                </li>
              </ul>
              <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
                <span>Total:</span>
                <span>₹{totalPrice}</span>
              </div>
              <Link to="/place-order" className="btn btn-dark w-100">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center fade-section mt-5 fs-5 text-muted">
          Your cart is empty
        </p>
      )}
    </div>
  );
}

export default Cart;
