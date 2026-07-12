import "../css/CategorySheet.css";
import { useNavigate } from "react-router-dom";

import { menLevelTwo } from "../data/category/levelTwo/menLevelTwo";
import { womenLevelTwo } from "../data/category/levelTwo/womenLevelTwo";
import { furnitureLevelTwo } from "../data/category/levelTwo/furnitureLevelTwo";
import { electronicsLevelTwo } from "../data/category/levelTwo/electronicsLevelTwo";

import { menLevelThree } from "../data/category/levelThree/menLevelThree";
import { womenLevelThree } from "../data/category/levelThree/womenLevelThree";
import { furnitureLevelThree } from "../data/category/levelThree/furnitureLevelThree";
import { electronicsLevelThree } from "../data/category/levelThree/electronicsLevelThree";

const categoryTwo = {
  Men: menLevelTwo,
  Women: womenLevelTwo,
  Electronics: electronicsLevelTwo,
  "Home & Furniture": furnitureLevelTwo,
};

const categoryThree = {
  Men: menLevelThree,
  Women: womenLevelThree,
  Electronics: electronicsLevelThree,
  "Home & Furniture": furnitureLevelThree,
};

const CategorySheet = ({ selectedCategory }) => {
  const navigate = useNavigate();

  const childCategory = (category = [], parentCategoryId) => {
    return category.filter(
      (child) => child.parentCategoryId === parentCategoryId,
    );
  };

  return (
    <div className="mega-menu-container">
      <div className="row">
        {categoryTwo[selectedCategory]?.map((item) => (
          <div className="col-lg-3 col-md-4 col-6 mb-4" key={item.categoryId}>
            <h6
              className="mega-heading"
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(
                  `/products/${encodeURIComponent(selectedCategory)}/${encodeURIComponent(item.name)}`,
                )
              }
            >
              {item.name}
            </h6>

            <ul className="mega-list">
              {childCategory(
                categoryThree[selectedCategory],
                item.categoryId,
              ).map((child) => (
                <li
                  key={child.categoryId}
                  onClick={() =>
                    navigate(
                      `/products/${encodeURIComponent(selectedCategory)}/${encodeURIComponent(item.name)}/${encodeURIComponent(child.name)}`,
                    )
                  }
                >
                  {child.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySheet;
