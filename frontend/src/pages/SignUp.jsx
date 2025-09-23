import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { registerUser } from '../features/users/userController';
import { setErrorMsg } from '../features/messages/messagesSlice';
import { useToastMessage } from '../features/utils/useToastMessage';
const FormSpinnerWrapper = React.lazy(() => import('../component/FormSpinnerWrapper'));

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({name: "", email: "", password: ""});
  const [avatar, setAvatar] = useState(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { errorMsg, successMsg, loading } = useSelector(state => state.users);

  useToastMessage(errorMsg, successMsg);

  const handleOnClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const imageUrl = URL.createObjectURL(file);
    setAvatar(imageUrl);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if(formData.password.length < 6) {
      dispatch(setErrorMsg("Password must be at least 6 characters"));
      return;
    }
    const userData = new FormData();
    userData.append("name", formData.name);
    userData.append("email", formData.email);
    userData.append("avatar", fileInputRef.current.files[0]);
    userData.append("password", formData.password);

    try {
      await dispatch(registerUser(userData)).unwrap();
      setFormData({name: "", email: "", password: ""});
      setAvatar(null);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      dispatch(setErrorMsg(err || "Registration failed"));
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <FormSpinnerWrapper loading={loading} >
        <form method='post' onSubmit={handleOnSubmit} className="p-3 p-md-5 border rounded-3 bg-body-tertiary text-center">
          <h2 className=''>Sign Up</h2>
          <img src={avatar || "./defaultPic.webp"} loading="lazy" alt="" className="rounded-circle my-3" onClick={handleOnClick} width={100} height={100} />
          <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange}/>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" value={formData.name} required placeholder="name" name='name' onChange={handleOnChange} />
            <label htmlFor="floatingInput">Name</label>
          </div>
          <div className="form-floating mb-3">
            <input type="email" name='email' className="form-control" required value={formData.email} id="floatingInput" placeholder="name@example.com" onChange={handleOnChange} />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input type="password" name='password' minLength={6} required className="form-control" value={formData.password} id="floatingPassword" placeholder="Password" onChange={handleOnChange} />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className='mb-3' >
            <Link to={"/login"} className='float-end' >Already have an account?</Link>
          </div>
            <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">Sign up</button>
            <hr className="my-4" />
            <small className="text-body-secondary">By clicking Sign up, you agree to the terms of use.</small>
        </form>
      </FormSpinnerWrapper>
    </div>
  )
}

export default SignUp