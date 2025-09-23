import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setErrorMsg } from "../features/messages/messagesSlice";
import { updateProfilePic } from "../features/users/userController";
const FormSpinnerWrapper = React.lazy(() => import("../component/FormSpinnerWrapper"));
import { useToastMessage } from "../features/utils/useToastMessage";

function ProfilePic() {

  const fileInputRef = useRef(null);
  const [ avatar, setAvatar ] = useState(null);
  const [ showModal, setShowModal ] = useState(false);
  const dispatch = useDispatch();
  const { loggedInUser, errorMsg, successMsg, loading } = useSelector(state => state.users);

  useToastMessage(errorMsg, successMsg);

  const handleOnClick = async () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const imageUrl = URL.createObjectURL(file);
    setAvatar(imageUrl);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("newAvatar", fileInputRef.current.files[0]);
    try {
      await dispatch(updateProfilePic(formData)).unwrap();
      setAvatar(null);
      fileInputRef.current.value = null;
      setShowModal(false);
    } catch (err) {
      dispatch(setErrorMsg(err || "Failed to update profile picture"));
    }
  };

    return (
      <>
        {loggedInUser ? (
          <button type="button" className="btn p-0" onClick={() => {setShowModal(true)}} >
            <img src={loggedInUser?.avatar || "./defaultPic.webp"} loading="lazy" width={35} height={35}
              className="rounded-circle" alt="User Avatar" />
          </button>
          
        ) : (
          <Link to={"/login"} className="btn btn-sm btn-dark">Login</Link>
        )}
        <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
         {showModal && (
          <>
            <div className="modal-backdrop fade show" />
              <div className="modal d-block" tabIndex="-1">
                <FormSpinnerWrapper loading={loading}>
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content p-3 text-center">
                      <div className="modal-header border-0">
                        <button
                          type="button"
                          className="btn-close"
                          onClick={() => !loading && setShowModal(false)}
                          disabled={loading}
                        />
                      </div>
                      <div className="modal-body position-relative">
                        <img
                          loading="lazy"
                          src={avatar || loggedInUser?.avatar}
                          className="rounded-circle img-fluid"
                          style={{ maxWidth: "400px", maxHeight: "400px" }}
                          alt="User Full Avatar"
                        />
                        <button
                          className="btn btn-primary position-absolute bottom-0 end-0 m-2"
                          onClick={avatar ? handleUpload : handleOnClick}
                          disabled={loading}
                        >
                          {loading ? "Processing..." : avatar ? "Update" : "Edit"}
                        </button>
                      </div>
                    </div>
                  </div>
                </FormSpinnerWrapper>
              </div>
          </>
          )}
      </>
    );
};

export default ProfilePic;