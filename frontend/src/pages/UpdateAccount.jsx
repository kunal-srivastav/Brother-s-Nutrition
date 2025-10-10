import React, { useState } from "react";
import { setErrorMsg } from "../features/messages/messagesSlice";
import { updateAccountInfo } from "../features/users/userController";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useToastMessage } from "../features/utils/useToastMessage";
const FormSpinnerWrapper = React.lazy(() => import("../component/FormSpinnerWrapper"));

function UpdateAccount () {

    const navigate = useNavigate();
    const { loggedInUser } = useSelector(state => state.users);
    const [ formData, setFormData ] = useState({name: "", email: "", role: loggedInUser?.role || "user"});
    const dispatch = useDispatch();
    const { errorMsg, successMsg, loading } = useSelector(state => state.users);

    useToastMessage(errorMsg, successMsg);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const { name, email, role } = formData;
        if(!name && !email && !role) {
            dispatch(setErrorMsg("You must enter at least one of them"));
            return;
        };

        try {
            await dispatch(updateAccountInfo({name, email, role})).unwrap();
            setTimeout(() => {
                navigate("/");
            }, 3000);
        } catch (err) {
            dispatch(setErrorMsg(err || "Failed to Update Account"));
        }
    }

    return (
        <div className="d-flex mt-5 p-2 justify-content-center">
            <FormSpinnerWrapper loading={loading} >
            <form method='post' onSubmit={handleOnSubmit} className="p-3 p-md-5 border rounded-3 bg-body-tertiary text-center">
                <h2 className=''>Update Account</h2>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" value={formData.name} placeholder="name" name='name' onChange={handleOnChange} />
                    <label htmlFor="floatingInput">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="email" name='email' className="form-control" value={formData.email} id="floatingInput" placeholder="name@example.com" onChange={handleOnChange} />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <select className="p-2 w-100 rounded-3" name="role" value={formData.role} onChange={handleOnChange} >
                    <option value="user">User</option>
                    <option value="admin" >Admin</option>
                </select>
                <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">Update</button>
            </form>
            </FormSpinnerWrapper>
        </div>
    );
};

export default UpdateAccount;