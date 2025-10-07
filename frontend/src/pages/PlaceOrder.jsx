import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../features/orders/orderController';
import { useNavigate } from 'react-router-dom';
import { useToastMessage } from '../features/utils/useToastMessage';
import { setErrorMsg } from '../features/messages/messagesSlice';

function PlaceOrder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [deliveryData, setDeliveryData] = useState({
    houseNo: "",
    street: "",
    city: "",
    country: "",
    zip: "",
    paymentMethod: "",
  });
  const [loading, setLoading] = useState(false);

  const { cartItems, totalPrice } = useSelector((state) => state.carts);
  const { successMsg, errorMsg } = useSelector((state) => state.messages);

  useToastMessage(errorMsg, successMsg);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setDeliveryData({ ...deliveryData, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const { houseNo, street, city, country, zip, paymentMethod } = deliveryData;
    if (!houseNo || !street || !city || !country || !zip || !paymentMethod) {
      dispatch(setErrorMsg("All fields are required"));
      return;
    }

    const orderItems = cartItems?.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));

    try {
      setLoading(true);
      await dispatch(placeOrder({ deliveryData, orderItems, totalPrice })).unwrap();
      setDeliveryData({ houseNo: "", street: "", city: "", country: "", zip: "", paymentMethod: "" });
      navigate("/orders");
    } catch (err) {
      const message = err?.message || "Failed to place order";
      dispatch(setErrorMsg(message));
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="row g-4">
        {cartItems?.length > 0 ? (
          <>
            {/* Cart Totals & Payment */}
            <div className="col-md-6 order-md-last">
              <div className="card shadow-lg rounded-4 p-4 mb-4 border-0" style={{ backgroundColor: "#f8f9fa" }}>
                <h4 className="d-flex justify-content-between align-items-center mb-4">
                  <span className="text-success">Cart Totals</span>
                  <span className="badge bg-success rounded-pill fs-6">{cartItems.length}</span>
                </h4>

                <ul className="list-group list-group-flush mb-4">
                  {cartItems.map((item) => (
                    <li
                      key={item.product._id}
                      className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 py-3"
                      style={{
                        borderBottom: "1px solid #e0e0e0",
                        transition: "all 0.3s",
                        borderRadius: "0.5rem",
                      }}
                    >
                      <span className="fw-semibold">
                        {item.product.name} × {item.quantity}
                      </span>
                      <span className="fw-bold text-success">
                        ₹{item.product.finalPrice * item.quantity}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="d-flex justify-content-between fw-bold fs-5 mb-4 border-top pt-3">
                  <span>Total:</span>
                  <span className="text-dark">₹{totalPrice}</span>
                </div>
              </div>
            </div>

            {/* Delivery Information & Payment Form */}
            <div className="col-md-6">
              <div className="card shadow-lg rounded-4 p-4 border-0" style={{ backgroundColor: "#fefefe" }}>
                <h4 className="mb-4">Delivery Information</h4>
                <form className="needs-validation" noValidate onSubmit={handleOnSubmit}>
                  <div className="mb-3 form-floating">
                    <input
                      type="text"
                      className="form-control shadow-sm"
                      id="addressInput"
                      placeholder="House / Apartment No."
                      name="houseNo"
                      value={deliveryData.houseNo}
                      onChange={handleOnChange}
                      required
                    />
                    <label htmlFor="addressInput">House / Apartment No.</label>
                    <div className="invalid-feedback">Please enter your house/apartment number.</div>
                  </div>

                  <div className="mb-3 form-floating">
                    <input
                      type="text"
                      className="form-control shadow-sm"
                      id="streetInput"
                      placeholder="Street"
                      name="street"
                      value={deliveryData.street}
                      onChange={handleOnChange}
                      required
                    />
                    <label htmlFor="streetInput">Street</label>
                    <div className="invalid-feedback">Please enter your street.</div>
                  </div>

                  <div className="row g-3">
                    <div className="col-md-5">
                      <input type="text" className="form-control shadow-sm" value={"India"} readOnly />
                    </div>

                    <div className="col-md-4">
                      <select
                        className="form-select shadow-sm"
                        id="state"
                        name="city"
                        value={deliveryData.city}
                        onChange={handleOnChange}
                        required
                      >
                        <option value="">Choose...</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                      </select>
                      <div className="invalid-feedback">Please provide a valid state.</div>
                    </div>

                    <div className="col-md-3">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control shadow-sm"
                          id="zipInput"
                          name="zip"
                          placeholder="Zip"
                          value={deliveryData.zip}
                          onChange={handleOnChange}
                          required
                        />
                        <label htmlFor="zipInput">Zip</label>
                        <div className="invalid-feedback">Zip code required.</div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Selection */}
                  <h5 className="my-3">Payment</h5>
                  <div className="d-flex flex-column gap-3 mb-4">
                    {["cod", "credit", "paypal"].map((method) => (
                      <div className="form-check" key={method}>
                        <input
                          className="form-check-input shadow-sm"
                          type="radio"
                          name="paymentMethod"
                          id={method}
                          value={method}
                          checked={deliveryData.paymentMethod === method}
                          onChange={handleOnChange}
                          required
                        />
                        <label className="form-check-label text-capitalize fw-medium" htmlFor={method}>
                          {method === "cod" ? "Cash on Delivery" : method}
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* Submit */}
                  <div className="d-flex justify-content-end">
                    <button
                      type="submit"
                      className="btn btn-dark rounded-pill px-5 py-2 shadow-sm hover-scale"
                      disabled={loading}
                    >
                      {loading ? "Placing Order..." : "Place Order"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        ) : (
          <h1 className='text-center'>No Products in cart</h1>
        )}
      </div>
    </div>
  );
}

export default PlaceOrder;