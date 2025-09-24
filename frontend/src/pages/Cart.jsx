import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProductsInCart, toggleProductInCart } from '../features/carts/cartController.jsx';
import { updateQuantity } from '../features/carts/cartSlice';
import { useEffect } from "react";
import { Icon } from "../component/Icons";

function Cart() {

  const dispatch = useDispatch();
  const { cartItems, totalPrice } = useSelector(state => state.carts);

  useEffect(() => {
    dispatch(getProductsInCart());
  }, [])

  return (
    <>
      <h2 className='text-center my-2'>Your Cart</h2>
      <hr />

      {cartItems?.length > 0 ? (
        <>
          <table className="table">
            <tbody>
              {cartItems?.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td scope="row">
                    <img
                      loading="lazy"
                      src={item?.product?.images?.[0] || "/default-product.png"}
                      className='ms-5 placeholder-glow'
                      width={50}
                      alt={item?.name || "Product"}
                    />
                  </td>
                  <td className='fs-6 w-50'>
                    {item?.product?.name}
                    <p>₹{item?.product?.finalPrice}<span className='ms-3 text-warning'>{item?.product?.category}</span></p>
                  </td>
                  <td className='pt-3 w-50'>
                    <input type="number"
                      className='input w-0'
                      min={1}
                      max={10}
                      value={item?.quantity}
                      onChange={(e) => {dispatch(updateQuantity({itemId: item?._id, quantity: Number(e.target.value)}))}}
                    />
                  </td>
                  <td className='pt-3'>
                    <Icon name={"Delete"}
                      size={25}
                      className="text-gray-400 hover:text-red-600 transition-colors duration-200 cursor-pointer"
                      style={{cursor: "pointer"}}
                      title="Remove from cart"
                      onClick={() => {dispatch(toggleProductInCart({productId: item?.product?._id}))}}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        {/* Cart Totals */}
        <div className="d-flex justify-content-end py-5">
            <div className="w-50 border p-3 rounded">
              <h3 className="mb-3">Cart Totals</h3>

              <ul className="list-group fw-semibold list-group-flush mb-3">
                {cartItems.map((item) => (
                  <li key={item._id} className="list-group-item d-flex justify-content-between">
                    {item?.product?.name} × {item?.quantity}
                    <span>₹{item?.product?.finalPrice * (item?.quantity || 1)}</span>
                  </li>

                ))}
                <li className="list-group-item d-flex justify-content-between">Shipping Charge: 
                  <span className="text-success">FREE</span>
                </li>
              </ul>

              <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
                <span>Total:</span>
                <span>
                  ₹{totalPrice}
                </span>
              </div>

              <Link to="/place-order" className="btn btn-dark w-100">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center">Your cart is empty</p>
      )}
    </>

  )
}

export default Cart;