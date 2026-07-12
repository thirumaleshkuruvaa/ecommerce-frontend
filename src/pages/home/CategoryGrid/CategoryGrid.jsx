import { useNavigate } from "react-router-dom";
import "../../../css/CategoryGrid.css";
import { buildCategoryPath } from "../../../utils/categoryNavigation";

const CategoryGrid = ({ categories = [] }) => {
  const navigate = useNavigate();

  const handleClick = (categoryId) => {
    if (!categoryId) return;
    navigate(buildCategoryPath(categoryId));
  };

  if (!categories || categories.length === 0) {
    return (
      <div className="container-fluid py-3 px-3">
        <div className="alert alert-light text-center mb-0">
          No grid categories available
        </div>
      </div>
    );
  }

  const item = (index) => categories[index] || null;

  return (
    <div className="container-fluid py-3 px-3">
      <div className="row g-3">
        {/* Left Big Card */}
        <div className="col-lg-3 col-md-6">
          {item(0) && (
            <div
              className="fashion-card"
              onClick={() => handleClick(item(0).categoryId)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={item(0).imageUrl}
                alt={item(0).name}
                className="fashion-img large-img"
              />
            </div>
          )}
        </div>

        {/* Center Layout */}
        <div className="col-lg-6">
          <div className="row g-3">
            <div className="col-md-4">
              {item(1) && (
                <div
                  className="fashion-card"
                  onClick={() => handleClick(item(1).categoryId)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={item(1).imageUrl}
                    alt={item(1).name}
                    className="fashion-img small-img"
                  />
                </div>
              )}
            </div>

            <div className="col-md-8">
              {item(2) && (
                <div
                  className="fashion-card"
                  onClick={() => handleClick(item(2).categoryId)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={item(2).imageUrl}
                    alt={item(2).name}
                    className="fashion-img small-img"
                  />
                </div>
              )}
            </div>

            <div className="col-md-8">
              {item(3) && (
                <div
                  className="fashion-card"
                  onClick={() => handleClick(item(3).categoryId)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={item(3).imageUrl}
                    alt={item(3).name}
                    className="fashion-img bottom-img"
                  />
                </div>
              )}
            </div>

            <div className="col-md-4">
              {item(4) && (
                <div
                  className="fashion-card"
                  onClick={() => handleClick(item(4).categoryId)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={item(4).imageUrl}
                    alt={item(4).name}
                    className="fashion-img bottom-img"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Big Card */}
        <div className="col-lg-3 col-md-6">
          {item(5) && (
            <div
              className="fashion-card"
              onClick={() => handleClick(item(5).categoryId)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={item(5).imageUrl}
                alt={item(5).name}
                className="fashion-img large-img"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;
