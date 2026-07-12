import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHomePageData } from "../../redux/home/homeThunk";

import HomeCarousel from "../../components/Carousel/HomeCarousel";
import ElectricCategory from "./ElectricCategory/ElectricCategory";
import ShopByCategory from "./ShopByCategory/ShopByCategory";
// import CategoryGrid from "./CategoryGrid/CategoryGrid";
import TodaysDeals from "../../components/deals/TodayDeals";
import BecomeSeller from "../seller/BecomeSeller";

const Home = () => {
  const dispatch = useDispatch();

  const {
    grid = [],
    shopByCategories = [],
    electricCategories = [],
    deals = [],
    loading,
    error,
  } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(getHomePageData());
  }, [dispatch]);

  return (
    <div className="pb-4">
      <HomeCarousel />

      {loading && (
        <div className="container mt-3">
          <div className="alert alert-info mb-0">Loading home page...</div>
        </div>
      )}

      {error && (
        <div className="container mt-3">
          <div className="alert alert-danger mb-0">
            {typeof error === "string" ? error : "Failed to load home page"}
          </div>
        </div>
      )}

      {!loading && !error && (
        <>
          <ElectricCategory categories={electricCategories} />
          <TodaysDeals deals={deals} />
          <ShopByCategory categories={shopByCategories} />
          {/* <CategoryGrid categories={grid} /> */}
          <BecomeSeller />
        </>
      )}
    </div>
  );
};

export default Home;
