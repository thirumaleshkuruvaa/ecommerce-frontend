import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import { getProductById } from "../../redux/customer/productThunk";
import { getReviewsByProductId } from "../../redux/review/reviewThunk";

const Review = ({ product }) => {
  const dispatch = useDispatch();

  const { reviews, loading } = useSelector((store) => store.review);

  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    if (product?.id) {
      dispatch(getReviewsByProductId(product.id));
    }
  }, [dispatch, product?.id]);

  const totalReviews = reviews?.length || 0;

  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
        ).toFixed(1)
      : "0.0";

  const fiveStar =
    totalReviews > 0
      ? (
          (reviews.filter((r) => r.rating === 5).length / totalReviews) *
          100
        ).toFixed(0)
      : 0;

  const fourStar =
    totalReviews > 0
      ? (
          (reviews.filter((r) => r.rating === 4).length / totalReviews) *
          100
        ).toFixed(0)
      : 0;

  const threeStar =
    totalReviews > 0
      ? (
          (reviews.filter((r) => r.rating === 3).length / totalReviews) *
          100
        ).toFixed(0)
      : 0;

  const twoStar =
    totalReviews > 0
      ? (
          (reviews.filter((r) => r.rating <= 2).length / totalReviews) *
          100
        ).toFixed(0)
      : 0;

  return (
    <div className="container-fluid py-4">
      <div className="row g-4">
        {/* LEFT SIDE */}

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <img
                src={product?.images?.[0]}
                alt={product?.title}
                className="img-fluid rounded mb-3"
                style={{
                  height: "250px",
                  objectFit: "cover",
                }}
              />

              <h5>{product?.brand}</h5>

              <p className="text-muted">{product?.title}</p>

              <h2 className="text-success">
                {averageRating}
                <i className="bi bi-star-fill ms-1"></i>
              </h2>

              <p className="text-muted">{totalReviews} Reviews</p>
            </div>
          </div>

          <div className="card border-0 shadow-sm mt-4">
            <div className="card-body">
              <h5 className="mb-4">Customer Rating Summary</h5>

              <div className="mb-3">
                <span>5 Star</span>
                <div className="progress mt-1">
                  <div
                    className="progress-bar bg-success"
                    style={{ width: `${fiveStar}%` }}
                  />
                </div>
              </div>

              <div className="mb-3">
                <span>4 Star</span>
                <div className="progress mt-1">
                  <div
                    className="progress-bar bg-primary"
                    style={{ width: `${fourStar}%` }}
                  />
                </div>
              </div>

              <div className="mb-3">
                <span>3 Star</span>
                <div className="progress mt-1">
                  <div
                    className="progress-bar bg-warning"
                    style={{ width: `${threeStar}%` }}
                  />
                </div>
              </div>

              <div>
                <span>1-2 Star</span>
                <div className="progress mt-1">
                  <div
                    className="progress-bar bg-danger"
                    style={{ width: `${twoStar}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold">Customer Reviews</h3>

            <button
              className="btn btn-dark"
              onClick={() => setShowReviewForm(true)}
            >
              <i className="bi bi-pencil-square me-2"></i>
              Write Review
            </button>
          </div>

          {/* OPEN MODAL */}

          {/* {showReviewForm && (
            <ReviewForm
              productId={product.id}
              onClose={() => setShowReviewForm(false)}
            />
          )} */}

          {showReviewForm && (
            <ReviewForm
              productId={product.id}
              onClose={() => setShowReviewForm(false)}
              refreshData={async () => {
                await dispatch(getReviewsByProductId(product.id));
                await dispatch(getProductById(product.id));
              }}
            />
          )}

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border"></div>
            </div>
          ) : reviews?.length > 0 ? (
            reviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                refreshReviews={async () => {
                  await dispatch(getReviewsByProductId(product.id));
                  await dispatch(getProductById(product.id));
                }}
              />
            ))
          ) : (
            <div className="alert alert-info">No Reviews Yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;
