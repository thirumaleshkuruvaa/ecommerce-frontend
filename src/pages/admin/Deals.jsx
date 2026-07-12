import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DealsTable from "../../components/admin/DealsTable";
import DealCategoryTable from "../../components/admin/DealCategoryTable";
import CreateDealForm from "../../components/admin/CreateDealForm";
import { getAllDeals } from "../../redux/deal/dealThunk";

const Deals = () => {
  const [tab, setTab] = useState("deals");
  const dispatch = useDispatch();

  const { deals, loading, error } = useSelector((state) => state.deal);

  useEffect(() => {
    dispatch(getAllDeals());
  }, [dispatch]);

  const categories = useMemo(() => {
    const uniqueMap = new Map();

    deals.forEach((deal) => {
      if (deal.category?.id && !uniqueMap.has(deal.category.id)) {
        uniqueMap.set(deal.category.id, deal.category);
      }
    });

    return Array.from(uniqueMap.values());
  }, [deals]);

  return (
    <div className="container-fluid py-3">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white">
          <div className="d-flex gap-2 flex-wrap">
            <button
              className={`btn ${
                tab === "deals" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setTab("deals")}
            >
              Deals
            </button>

            <button
              className={`btn ${
                tab === "categories" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setTab("categories")}
            >
              Categories
            </button>

            <button
              className={`btn ${
                tab === "create" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setTab("create")}
            >
              Create Deal
            </button>
          </div>
        </div>

        <div className="card-body">
          {loading && <div className="alert alert-info">Loading deals...</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          {tab === "deals" && <DealsTable deals={deals} />}
          {tab === "categories" && (
            <DealCategoryTable categories={categories} />
          )}
          {tab === "create" && <CreateDealForm />}
        </div>
      </div>
    </div>
  );
};

export default Deals;
