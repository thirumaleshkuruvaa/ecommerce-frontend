import { useNavigate } from "react-router-dom";
import { buildCategoryPath } from "../../../utils/categoryNavigation";

const ElectricCategoryCard = ({ categories = [] }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (item) => {
    if (!item?.categoryId) return;
    navigate(buildCategoryPath(item.categoryId));
  };

  if (!categories.length) {
    return (
      <p className="text-muted mb-0">No electronic categories available</p>
    );
  }

  return (
    <div className="row g-3">
      {categories.map((item) => (
        <div
          key={item.id}
          className="col-6 col-sm-4 col-md-3 col-lg-2"
          onClick={() => handleCategoryClick(item)}
          style={{ cursor: "pointer" }}
        >
          <div className="border rounded-4 p-3 h-100 text-center bg-light shadow-sm">
            <div
              className="d-flex align-items-center justify-content-center mb-2"
              style={{ minHeight: "110px" }}
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="img-fluid"
                style={{ maxHeight: "100px", objectFit: "contain" }}
              />
            </div>

            <h6 className="fw-semibold mb-0">{item.name}</h6>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ElectricCategoryCard;
