import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setErrorMsg } from "../features/messages/messagesSlice";
import { updatePassword } from "../features/users/userController";
import { useNavigate } from "react-router-dom";
import { useToastMessage } from "../features/utils/useToastMessage";
const FormSpinnerWrapper = React.lazy(() => import("../component/FormSpinnerWrapper"));

function ChangePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { errorMsg, successMsg, loading } = useSelector((state) => state.users);
  
  useToastMessage(errorMsg, successMsg);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updatePassword({ oldPassword, newPassword })).unwrap();
      setOldPassword("");
      setNewPassword("");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      dispatch(setErrorMsg(err || "Password unchanged"));
    };
  };

  return (
  <div className="d-flex justify-content-center mt-5">
    <FormSpinnerWrapper loading={loading} >
      <form
        className="p-4 p-md-5 border rounded-3 bg-body-tertiary"
        onSubmit={handleOnSubmit}
      >
        <h2 className="text-center mb-3">Change Password</h2>

        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingOldPassword"
            value={oldPassword}
            minLength={6}
            required
            name="oldPassword"
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Old Password"
            disabled={loading} // optional: disable inputs while loading
          />
          <label htmlFor="floatingOldPassword">Old Password</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingNewPassword"
            value={newPassword}
            minLength={6}
            required
            name="newPassword"
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            disabled={loading} // optional
          />
          <label htmlFor="floatingNewPassword">New Password</label>
        </div>

        <button
          className="w-100 btn btn-lg btn-primary"
          type="submit"
          disabled={loading}
        >
          Update
        </button>
      </form>
    </FormSpinnerWrapper>
  </div>

  );
}

export default ChangePassword;
