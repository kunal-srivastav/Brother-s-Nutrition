import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../features/reviews/reviewController";
import { toast } from "react-toastify";
import { useToastMessage } from "../features/utils/useToastMessage";

function ReviewForm({productId}) {

    const dispatch = useDispatch();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [text, setText] = useState("");
    const { errorMsg, successMsg } = useSelector(state => state.reviews);

    useToastMessage(errorMsg, successMsg);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!rating || !text.trim()) {
         toast.error("Please provide both rating and review text.");
         return;
        }
        dispatch(createReview({rating, comment: text, productId}));
        setRating(0);
        setText("");
  };

    return (
        <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <h3 className="card-title mb-3">Write a Review</h3>

        {/* Rating */}
        <div className="mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
            <button type="button" key={star}
                className={`btn btn-link btn-sm p-0 me-1 ${
                star <= (hover || rating) ? "text-warning" : "text-secondary"
                }`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                style={{ fontSize: "1.5rem", textDecoration: "none" }} >
                ★
            </button>
            ))}
        </div>

        {/* Review text */}
        <div className="mb-3">
            <textarea className="form-control" rows="4" value={text} onChange={(e) => setText(e.target.value)}
            placeholder="Share your experience..." />
        </div>

        {/* Submit button */}
        <button type="submit" className="btn btn-primary">
            Submit Review
        </button>
        </form>
  );
}

export default ReviewForm;