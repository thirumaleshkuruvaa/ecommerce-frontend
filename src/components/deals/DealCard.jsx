import { useNavigate } from "react-router-dom";
import "../../css/DealCard.css";
import { buildCategoryPath } from "../../utils/categoryNavigation";

const DealCard = ({ deal }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const categoryPath = deal?.category?.categoryId;
    if (!categoryPath) return;
    navigate(buildCategoryPath(categoryPath));
  };

  return (
    <div className="deal-card" onClick={handleClick}>
      <div className="deal-image-wrapper">
        <img
          src={
            deal?.category?.imageUrl ||
            "https://via.placeholder.com/300x220?text=No+Image"
          }
          alt={deal?.category?.name || "Deal"}
          className="deal-image"
        />
      </div>

      <div className="deal-content">
        <p className="deal-category">{deal?.category?.name || "Category"}</p>

        <h3 className="deal-discount">
          {deal?.discount ? `${deal.discount}% OFF` : "Best Offer"}
        </h3>

        <button
          className="deal-btn"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default DealCard;
