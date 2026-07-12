import { useState } from "react";
import { useDispatch } from "react-redux";

import { createReview } from "../../redux/review/reviewThunk";

const ReviewForm = ({ productId, onClose, refreshData }) => {
  const dispatch = useDispatch();

  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        createReview({
          productId,
          reviewData: {
            reviewText,
            reviewRating,
            productImages: imageUrl ? [imageUrl] : [],
          },
        }),
      ).unwrap();

      //   dispatch(getReviewsByProductId(productId));
      await refreshData();
      setReviewText("");
      setReviewRating(5);
      setImageUrl("");

      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Write Review</h5>

            <button className="btn-close" onClick={onClose}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <label className="form-label">Rating</label>

              <select
                className="form-select mb-3"
                value={reviewRating}
                onChange={(e) => setReviewRating(Number(e.target.value))}
              >
                <option value="5">⭐⭐⭐⭐⭐</option>
                <option value="4">⭐⭐⭐⭐</option>
                <option value="3">⭐⭐⭐</option>
                <option value="2">⭐⭐</option>
                <option value="1">⭐</option>
              </select>

              <label className="form-label">Review</label>

              <textarea
                rows="4"
                className="form-control mb-3"
                placeholder="Write your review..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              />

              <label className="form-label">Image URL</label>

              <input
                type="text"
                className="form-control"
                placeholder="Paste image url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>

              <button type="submit" className="btn btn-success">
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
