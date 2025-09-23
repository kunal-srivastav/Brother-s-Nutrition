import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { setErrorMsg } from '../features/messages/messagesSlice';
import { loginUser } from '../features/users/userController';
import { useDispatch, useSelector } from "react-redux";
import { useToastMessage } from '../features/utils/useToastMessage';
const FormSpinnerWrapper = React.lazy(() => import('../component/FormSpinnerWrapper'));

function Login() {

  const navigate = useNavigate();

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const dispatch = useDispatch();
  const { errorMsg, successMsg, loading } = useSelector(state => state.users);

  useToastMessage(errorMsg, successMsg);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await dispatch(loginUser({email, password})).unwrap();
      setEmail("");
      setPassword("");
      setTimeout(() => {
        navigate("/")
      }, 3000);
    } catch (err) {
      dispatch(setErrorMsg(err || "Login failed"));
    }

  }
  
  return (
    <div className="d-flex justify-content-center mt-5">
      <FormSpinnerWrapper loading={loading} >
        <form onSubmit={handleOnSubmit} className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
          <h2 className='text-center mb-3'>Login</h2>
          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="floatingInput" required name="email" onChange={(e) => {setEmail(e.target.value)}} placeholder="name@example.com" />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" required name="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="Password" />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className='mb-3' >
            <Link to={""}>forget your password?</Link>
            <Link to={"/sign-up"} className='float-end' >Create account?</Link>

          </div>
              <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
              <hr className="my-4" />
              <small className="text-body-secondary">By clicking Sign up, you agree to the terms of use.</small>
        </form>
      </FormSpinnerWrapper>
    </div>
  )
}

export default Login