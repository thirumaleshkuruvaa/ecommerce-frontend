import { useNavigate } from "react-router-dom";
import "../../../css/ShopByCategory.css";
import { buildCategoryPath } from "../../../utils/categoryNavigation";

const ShopByCategoryCard = ({ categories = [] }) => {
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (!item?.categoryId) return;
    navigate(buildCategoryPath(item.categoryId));
  };

  if (!categories.length) {
    return <div className="empty-box">No categories available</div>;
  }

  return (
    <div className="shop-wrapper">
      <div className="shop-grid">
        {categories.map((item) => (
          <div
            className="shop-card"
            key={item.id}
            onClick={() => handleClick(item)}
          >
            <div className="shop-image-box">
              <img src={item.imageUrl} alt={item.name} className="shop-image" />
            </div>
            <p className="shop-name">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByCategoryCard;
