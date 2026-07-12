import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaFilter } from "react-icons/fa";

import FilterSection from "./FilterSection";
import ProductCard from "./ProductCard";
import { getAllProducts } from "../../redux/customer/productThunk";

const Product = () => {
  const { mainCategory, levelTwoCategory, levelThreeCategory } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { products, totalPages, loading, error } = useSelector(
    (state) => state.product,
  );

  const [showFilter, setShowFilter] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const page = Number(searchParams.get("page")) || 1;

  // IMPORTANT:
  // first priority -> levelThreeCategory
  // second priority -> levelTwoCategory
  // third priority -> mainCategory
  const selectedCategory = useMemo(() => {
    if (levelThreeCategory) return decodeURIComponent(levelThreeCategory);
    if (levelTwoCategory) return decodeURIComponent(levelTwoCategory);
    if (mainCategory) return decodeURIComponent(mainCategory);
    return "";
  }, [mainCategory, levelTwoCategory, levelThreeCategory]);

  useEffect(() => {
    const filters = {
      category: selectedCategory,
      brand: searchParams.get("brand") || "",
      colors: searchParams.get("color") || "",
      minDiscount: searchParams.get("discount")
        ? Number(searchParams.get("discount"))
        : null,
      minPrice: searchParams.get("minPrice")
        ? Number(searchParams.get("minPrice"))
        : null,
      maxPrice: searchParams.get("maxPrice")
        ? Number(searchParams.get("maxPrice"))
        : null,
      sort: searchParams.get("sort") || "",
      pageNumber: page - 1,
    };

    console.log("Selected category =>", selectedCategory);
    console.log("Filters sent to API =>", filters);

    dispatch(getAllProducts(filters));
  }, [dispatch, selectedCategory, searchParams, page]);

  const changePage = (newPage) => {
    if (newPage < 1) return;
    if (totalPages && newPage > totalPages) return;

    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));
    setSearchParams(params);
  };

  const formatText = (text) =>
    text?.replaceAll("_", " ")?.replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="container-fluid mt-4 pb-5">
      <div className="mb-4 text-center">
        <h2 className="fw-bold text-uppercase">
          {formatText(
            levelThreeCategory ||
              levelTwoCategory ||
              mainCategory ||
              "All Products",
          )}
        </h2>

        <p className="text-muted">
          {mainCategory ? formatText(mainCategory) : "All Products"}
          {levelTwoCategory ? ` / ${formatText(levelTwoCategory)}` : ""}
          {levelThreeCategory ? ` / ${formatText(levelThreeCategory)}` : ""}
        </p>
      </div>

      <div className="row">
        {isLargeScreen && (
          <div className="col-lg-3">
            <FilterSection
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </div>
        )}

        <div className={isLargeScreen ? "col-lg-9" : "col-12"}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            {!isLargeScreen && (
              <button
                className="btn btn-dark"
                onClick={() => setShowFilter(!showFilter)}
              >
                <FaFilter className="me-2" />
                Filters
              </button>
            )}

            <select
              className="form-select"
              style={{ width: "220px" }}
              value={searchParams.get("sort") || ""}
              onChange={(e) => {
                const params = new URLSearchParams(searchParams);

                if (e.target.value) {
                  params.set("sort", e.target.value);
                } else {
                  params.delete("sort");
                }

                params.set("page", "1");
                setSearchParams(params);
              }}
            >
              <option value="">Sort By</option>
              <option value="lowToHigh">Price Low To High</option>
              <option value="highToLow">Price High To Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {!isLargeScreen && showFilter && (
            <div className="mb-4">
              <FilterSection
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            </div>
          )}

          {loading && <p>Loading products...</p>}

          {error && (
            <p className="text-danger">
              {typeof error === "string" ? error : "Failed to load products"}
            </p>
          )}

          {!loading && products?.length === 0 && (
            <div className="text-center py-5">
              <h5>No Products Found</h5>
            </div>
          )}

          <div className="row g-4">
            {products?.map((product) => (
              <div className="col-lg-3 col-md-4 col-6" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {products?.length > 0 && (
            <div className="d-flex justify-content-center mt-5 gap-2 flex-wrap">
              <button
                className="btn btn-outline-dark"
                disabled={page === 1}
                onClick={() => changePage(page - 1)}
              >
                Prev
              </button>

              {Array.from({ length: totalPages || 1 }, (_, index) => (
                <button
                  key={index}
                  className={`btn ${
                    page === index + 1 ? "btn-dark" : "btn-outline-dark"
                  }`}
                  onClick={() => changePage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button
                className="btn btn-outline-dark"
                disabled={page === totalPages || totalPages === 0}
                onClick={() => changePage(page + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
