import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeCategoryTable from "../../components/admin/HomeCategoryTable";
import CreateHomeCategoryForm from "../../components/admin/createHomeCategoryForm";
import { getAllHomeCategories } from "../../redux/adminhomecategory/adminHomeCategoryThunk";

const HomeCategory = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("list");

  const { homeCategories, loading, error } = useSelector(
    (state) => state.adminHomeCategory,
  );

  useEffect(() => {
    dispatch(getAllHomeCategories());
  }, [dispatch]);

  return (
    <div className="container-fluid">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <h4 className="mb-0">Home Categories</h4>

            <div className="d-flex gap-2">
              <button
                className={`btn ${
                  tab === "list" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setTab("list")}
              >
                Categories
              </button>

              <button
                className={`btn ${
                  tab === "create" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setTab("create")}
              >
                Create Category
              </button>
            </div>
          </div>
        </div>

        <div className="card-body">
          {loading && <div className="alert alert-info">Loading...</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          {tab === "list" && <HomeCategoryTable categories={homeCategories} />}

          {tab === "create" && <CreateHomeCategoryForm />}
        </div>
      </div>
    </div>
  );
};

export default HomeCategory;
