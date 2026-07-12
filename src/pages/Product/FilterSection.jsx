import { useState } from "react";
import "../../css/FilterSection.css";

import { colors } from "../../data/filter/color";
import { discounts } from "../../data/filter/discounts";
import { price } from "../../data/filter/price";
import { brands } from "../../data/filter/brand";

const FilterSection = ({ searchParams, setSearchParams }) => {
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [showAllColors, setShowAllColors] = useState(false);

  const visibleBrands = showAllBrands ? brands : brands.slice(0, 10);
  const visibleColors = showAllColors ? colors : colors.slice(0, 10);

  const updateFilters = (e) => {
    const { name, value, checked, type } = e.target;

    const params = new URLSearchParams(searchParams);

    if (type === "radio") {
      params.set(name, value);
    }

    if (type === "checkbox") {
      const existing = params.get(name);
      let arr = existing ? existing.split(",") : [];

      if (checked) {
        if (!arr.includes(value)) {
          arr.push(value);
        }
      } else {
        arr = arr.filter((v) => v !== value);
      }

      if (arr.length > 0) {
        params.set(name, arr.join(","));
      } else {
        params.delete(name);
      }
    }

    params.set("page", "1");

    setSearchParams(params);
  };

  const handlePriceChange = (item) => {
    const params = new URLSearchParams(searchParams);

    params.set("minPrice", item.min);
    params.set("maxPrice", item.max);
    params.set("page", "1");

    setSearchParams(params);
  };

  const clearAll = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="filter-container">
      {/* Header */}

      <div className="filter-header">
        <h4>
          <i className="bi bi-funnel-fill me-2"></i>
          Filters
        </h4>

        <button className="clear-btn" onClick={clearAll}>
          Clear All
        </button>
      </div>

      {/* PRICE */}

      <div className="filter-box">
        <h5>Price</h5>

        {price.map((item, index) => (
          <label key={index}>
            <input
              type="radio"
              name="price"
              checked={
                searchParams.get("minPrice") === String(item.min) &&
                searchParams.get("maxPrice") === String(item.max)
              }
              onChange={() => handlePriceChange(item)}
            />

            {item.name}
          </label>
        ))}
      </div>

      {/* BRANDS */}

      <div className="filter-box">
        <h5>Brands</h5>

        {visibleBrands.map((brand, index) => (
          <label key={index}>
            <input
              type="checkbox"
              name="brand"
              value={brand.value}
              checked={
                searchParams.get("brand")?.split(",").includes(brand.value) ||
                false
              }
              onChange={updateFilters}
            />

            {brand.name}
          </label>
        ))}

        {brands.length > 10 && (
          <button
            type="button"
            className="show-more-btn"
            onClick={() => setShowAllBrands(!showAllBrands)}
          >
            {showAllBrands ? (
              <>
                Show Less
                <i className="bi bi-chevron-up ms-1"></i>
              </>
            ) : (
              <>
                Show More ({brands.length - 10})
                <i className="bi bi-chevron-down ms-1"></i>
              </>
            )}
          </button>
        )}
      </div>

      {/* COLORS */}

      <div className="filter-box">
        <h5>Colors</h5>

        {visibleColors.map((color, index) => (
          <label key={index} className="color-label">
            <input
              type="checkbox"
              name="color"
              value={color.name}
              checked={
                searchParams.get("color")?.split(",").includes(color.name) ||
                false
              }
              onChange={updateFilters}
            />

            <span
              className="color-circle"
              style={{
                backgroundColor: color.hex,
              }}
            />

            {color.name}
          </label>
        ))}

        {colors.length > 10 && (
          <button
            type="button"
            className="show-more-btn"
            onClick={() => setShowAllColors(!showAllColors)}
          >
            {showAllColors ? (
              <>
                Show Less
                <i className="bi bi-chevron-up ms-1"></i>
              </>
            ) : (
              <>
                Show More ({colors.length - 10})
                <i className="bi bi-chevron-down ms-1"></i>
              </>
            )}
          </button>
        )}
      </div>

      {/* DISCOUNT */}

      <div className="filter-box">
        <h5>Discount</h5>

        {discounts.map((discount, index) => (
          <label key={index}>
            <input
              type="radio"
              name="discount"
              value={discount.value}
              checked={searchParams.get("discount") === String(discount.value)}
              onChange={updateFilters}
            />

            {discount.name}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterSection;
