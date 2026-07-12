import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDeal, getAllDeals } from "../../redux/deal/dealThunk";
import { clearDealMessage } from "../../redux/deal/dealSlice";
import { getAllHomeCategories } from "../../redux/adminhomecategory/adminHomeCategoryThunk";

const CreateDealForm = () => {
  const dispatch = useDispatch();

  const { loading, error, successMessage } = useSelector((state) => state.deal);
  const { homeCategories = [] } = useSelector(
    (state) => state.adminHomeCategory,
  );

  const [form, setForm] = useState({
    categoryId: "",
    discount: "",
  });

  useEffect(() => {
    dispatch(getAllHomeCategories());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearDealMessage());
    };
  }, [dispatch]);

  const dealCategories = useMemo(() => {
    return homeCategories.filter((item) => item.section === "DEALS_OF_THE_DAY");
  }, [homeCategories]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.categoryId || !form.discount) {
      alert("Please select category and enter discount");
      return;
    }

    const payload = {
      discount: Number(form.discount),
      category: {
        id: Number(form.categoryId),
      },
    };

    const result = await dispatch(createDeal(payload));

    if (createDeal.fulfilled.match(result)) {
      setForm({
        categoryId: "",
        discount: "",
      });

      dispatch(getAllDeals());
    }
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <h5 className="mb-4">Create New Deal</h5>

        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Deal Category</label>

            <select
              className="form-select"
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
            >
              <option value="">Select Deal Category</option>

              {dealCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.categoryId})
                </option>
              ))}
            </select>

            {dealCategories.length === 0 && (
              <small className="text-danger">
                No categories found in DEALS_OF_THE_DAY section. First create
                Home Categories with section = DEALS_OF_THE_DAY.
              </small>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Discount %</label>
            <input
              type="number"
              className="form-control"
              name="discount"
              value={form.discount}
              onChange={handleChange}
              placeholder="Enter discount"
              min="1"
              max="100"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || dealCategories.length === 0}
          >
            {loading ? "Creating..." : "Create Deal"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDealForm;
