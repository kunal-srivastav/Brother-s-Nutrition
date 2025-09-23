import React, { Suspense, useEffect } from 'react';
import { ToastContainer } from "react-toastify";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { currentUser } from './features/users/userController';

// Lazy-loaded Pages
const HomePage = React.lazy(() => import('./pages/HomePage'));
const Collection = React.lazy(() => import('./pages/Collection'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Login = React.lazy(() => import('./pages/Login'));
const SignUp = React.lazy(() => import('./pages/SignUp'));
const Cart = React.lazy(() => import('./pages/Cart'));
const Orders = React.lazy(() => import('./pages/Orders'));
const PlaceOrder = React.lazy(() => import('./pages/PlaceOrder'));
const Product = React.lazy(() => import('./pages/Product'));
const ChangePassword = React.lazy(() => import('./pages/ChangePassword'));
const UpdateAccount = React.lazy(() => import('./pages/UpdateAccount'));
const ProfilePic = React.lazy(() => import('./pages/ProfilePic'));
const ProductForm = React.lazy(() => import('./pages/ProductForm'));
const Admin = React.lazy(() => import('./pages/Admin'));
const ProductList = React.lazy(() => import('./pages/ProductList'));
const OrdersList = React.lazy(() => import('./pages/OrdersList'));

// Lazy-loaded Layout Components
const NavBar = React.lazy(() => import('./component/NavBar'));
const Footer = React.lazy(() => import('./component/Footer'));

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const hideLayoutPaths = [
    "/login",
    "/sign-up",
    "/update-account",
    "/change-password",
    "/admin"
  ];

  const hideLayout = hideLayoutPaths.some(path => location.pathname.startsWith(path));

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);

  return (
    <div className="container-fluid p-0">
      {/* Toast Notifications */}
      <ToastContainer position="top-center" autoClose={2000} closeButton={false} />

      <Suspense fallback={ 
        <div className="position-relative position-absolute top-50 start-50 spinner-border text-center" role="status">
          <span className=" visually-hidden">Loading...</span>
        </div>
       } >

      {/* NavBar */}
        {!hideLayout &&  <NavBar /> }

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage /> } />
          <Route path="/collection" element={ <Collection /> } />
          <Route path="/about" element={ <About /> } />
          <Route path="/contact" element={ <Contact /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/sign-up" element={ <SignUp /> } />
          <Route path="/update-account/:userId" element={ <UpdateAccount /> } />
          <Route path="/change-password" element={ <ChangePassword /> } />
          <Route path="/profile" element={ <ProfilePic /> } />
          <Route path="/cart" element={ <Cart /> } />
          <Route path="/orders" element={ <Orders /> } />
          <Route path="/place-order" element={ <PlaceOrder /> } />
          <Route path="/product/:productId" element={ <Product /> } />

          {/* Admin Routes */}
          <Route path="/admin" element={ <Admin /> }>
            <Route index element={ <ProductList /> } />
            <Route path="product-list" element={ <ProductList /> } />
            <Route path="add-product" element={ <ProductForm /> } />
            <Route path="update-product/:productId" element={ <ProductForm /> } />
            <Route path="order-list" element={ <OrdersList /> } />
          </Route>
        </Routes>

        {/* Footer */}
        {!hideLayout && <Footer /> }
      </Suspense>
    </div>
  );
}

export default App;