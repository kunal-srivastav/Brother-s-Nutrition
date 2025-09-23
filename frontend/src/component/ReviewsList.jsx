import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview, getAllReviews, updateReview } from "../features/reviews/reviewController";
import { setErrorMsg } from "../features/messages/messagesSlice";
import { Icon, StarFull } from "./Icons";
const Pagination = React.lazy(() => import("./Pagination"));

function ReviewsList({ productId }) {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state.users);
  const { reviews, totalPages, totalReviews } = useSelector((state) => state.reviews);

  const [editingReview, setEditingReview] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (productId) {
      dispatch(getAllReviews({ productId, pageNum, limit: 5 }));
    }
  }, [productId, pageNum, dispatch]);

  useEffect(() => {
    if (editingReview) {
      setRating(editingReview.rating);
      setComment(editingReview.comment);
    }
  }, [editingReview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await dispatch(updateReview({ reviewId: editingReview._id, rating, comment })).unwrap();
      setEditingReview(null);
    } catch (err) {
      dispatch(setErrorMsg(err || "Failed to update review"));
    } finally {
      setUpdating(false);
    }
  };

  const handleClose = () => {
    setEditingReview(null);
  };

  return (
    <>
      {reviews?.length > 0 ? (
        <div className="mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="d-flex align-items-center gap-2 mb-0 pb-0">
              Customer Reviews
              <span
                className="badge rounded-pill text-white px-3 py-2 d-flex align-items-center gap-1"
                style={{ background: "linear-gradient(45deg, #007bff, #00c6ff)" }}
              >
                <StarFull size={25} color="gold" fill="gold" /> {totalReviews}
              </span>
            </h4>
            <small className="text-muted">
              Page {pageNum} of {totalPages} ({totalReviews} reviews)
            </small>
          </div>

          {reviews.map((review) => (
            <div key={review?._id} className="card mb-3 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center gap-2">
                  <img src={review?.author?.avatar} loading="lazy"
                    className="rounded-circle" width={30} height={30} alt="User avatar" />

                  <h6 className="card-subtitle mb-2 mt-2 text-muted flex-fill">
                    {review?.author?.name || "Author name"}
                  </h6>

                  {review?.author?._id === loggedInUser?._id && (
                    <div className="dropdown float-end">
                      <button className="btn btn-sm" type="button"
                        data-bs-toggle="dropdown" aria-label="Review options"
                        aria-expanded="false" >

                        <Icon name={"ThreeDots"} size={20} />
                      </button>

                      <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                          <button className="dropdown-item"
                            onClick={() => setEditingReview(review)} >
                            ✏️ Update
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item text-danger"
                            onClick={() => dispatch(deleteReview(review._id))} >
                            🗑️ Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Rating */}
                <div className="mb-2">
                  {[1, 2, 3, 4, 5].map((starNum) => (
                    <StarFull key={starNum} size={20}
                      color={starNum <= review.rating ? "gold" : "lightgray"}
                      fill={starNum <= review.rating ? "gold" : "none"} />
                  ))}
                </div>

                <p className="card-text">{review.comment}</p>

                <small className="text-muted">
                  {review.createdAt
                    ? new Date(review.createdAt).toLocaleString()
                    : "Unknown date"}
                </small>
              </div>
            </div>
          ))}

          <Suspense fallback={"Loading..."}>
            <Pagination page={pageNum} setPage={setPageNum} totalPages={totalPages} />
          </Suspense>
        </div>
      ) : (
        <p className="text-muted">No reviews yet. Be the first to review!</p>
      )}

      {editingReview && (
        <>
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <form onSubmit={handleSubmit}>
                  <div className="modal-header">
                    <h5 className="modal-title">Edit Review</h5>
                    <button type="button" className="btn-close" onClick={handleClose} />
                  </div>
                  <div className="modal-body">
                    {/* Editable Rating */}
                    <div className="mb-3">
                      {[1, 2, 3, 4, 5].map((starNum) => (
                        <Icon name={"Star"} key={starNum} size={30} role="button"
                          aria-label={`Rate ${starNum} star${starNum > 1 ? "s" : ""}`}
                          color={starNum <= rating ? "gold" : "lightgray"}
                          fill={starNum <= rating ? "gold" : "none"}
                          style={{ cursor: "pointer" }}
                          onClick={() => setRating(starNum)} />
                      ))}
                    </div>

                    <textarea className="form-control" value={comment}
                      onChange={(e) => setComment(e.target.value)} required />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleClose}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={updating}>
                      {updating ? "Saving..." : "Update Review"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </>
  );
}

export default ReviewsList;