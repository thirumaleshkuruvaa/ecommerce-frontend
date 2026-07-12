import "../../css/review/ReviewCard.css";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateReview, deleteReview } from "../../redux/review/reviewThunk";

const ReviewCard = ({ review, refreshReviews }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.auth);

  const [editMode, setEditMode] = useState(false);
  const [reviewText, setReviewText] = useState(review.reviewText);
  const [rating, setRating] = useState(review.rating);

  const isOwner = Number(user?.id) === Number(review?.user?.id);
  const handleUpdate = async () => {
    try {
      await dispatch(
        updateReview({
          reviewId: review.id,
          reviewData: {
            reviewText,
            reviewRating: rating,
          },
        }),
      ).unwrap();

      await refreshReviews();

      setEditMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  // const handleDelete = async () => {
  //   if (!window.confirm("Delete this review?")) return;

  //   try {
  //     await dispatch(deleteReview(review.id)).unwrap();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleDelete = async () => {
    if (!window.confirm("Delete this review?")) return;

    try {
      await dispatch(deleteReview(review.id)).unwrap();

      await refreshReviews();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="review-card">
      <div className="review-header">
        <div className="review-user">
          <div className="review-user-icon">
            <i className="bi bi-person-fill"></i>
          </div>

          <div className="ms-2">
            <p className="review-name">{review?.user?.fullName}</p>

            <small className="review-date">{review?.createdAt}</small>
          </div>
        </div>

        <div className="review-rating">
          {rating}
          <i className="bi bi-star-fill ms-1"></i>
        </div>
      </div>

      {!editMode ? (
        <p className="review-text">{review.reviewText}</p>
      ) : (
        <>
          <select
            className="form-select mt-2"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value="1">1 Star</option>
            <option value="2">2 Star</option>
            <option value="3">3 Star</option>
            <option value="4">4 Star</option>
            <option value="5">5 Star</option>
          </select>

          <textarea
            rows="3"
            className="form-control mt-2"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </>
      )}

      {review?.productImages?.length > 0 && (
        <div className="review-images">
          {review.productImages.map((img, index) => (
            <img key={index} src={img} alt="review" />
          ))}
        </div>
      )}

      {isOwner && (
        <div className="review-actions">
          {!editMode ? (
            <>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => setEditMode(true)}
              >
                <i className="bi bi-pencil-square"></i>
              </button>

              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleDelete}
              >
                <i className="bi bi-trash"></i>
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-success btn-sm" onClick={handleUpdate}>
                Save
              </button>

              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
