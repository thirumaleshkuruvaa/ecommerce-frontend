import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearHomeCategoryMessage } from "../../redux/adminhomecategory/adminHomeCategorySlice";
import {
  createHomeCategories,
  getAllHomeCategories,
} from "../../redux/adminhomecategory/adminHomeCategoryThunk";

const sectionOptions = [
  "ELECTRIC_CATEGORIES",
  "GRID",
  "SHOP_BY_CATEGORIES",
  "DEALS_OF_THE_DAY",
];

const CreateHomeCategoryForm = () => {
  const dispatch = useDispatch();

  const { loading, error, successMessage } = useSelector(
    (state) => state.adminHomeCategory,
  );

  const [form, setForm] = useState({
    name: "",
    imageUrl: "",
    categoryId: "",
    section: "ELECTRIC_CATEGORIES",
  });

  useEffect(() => {
    return () => {
      dispatch(clearHomeCategoryMessage());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.imageUrl || !form.categoryId || !form.section) {
      alert("Please fill all fields");
      return;
    }

    // backend expects LIST<HomeCategory>
    const payload = [
      {
        name: form.name,
        imageUrl: form.imageUrl,
        categoryId: form.categoryId,
        section: form.section,
      },
    ];

    const resultAction = await dispatch(createHomeCategories(payload));

    if (createHomeCategories.fulfilled.match(resultAction)) {
      setForm({
        name: "",
        imageUrl: "",
        categoryId: "",
        section: "ELECTRIC_CATEGORIES",
      });

      dispatch(getAllHomeCategories());
    }
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <h5 className="mb-4">Create Home Category</h5>

        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* NAME */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Category Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter category name"
              />
            </div>

            {/* CATEGORY ID */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Category ID</label>
              <input
                type="text"
                className="form-control"
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                placeholder="Enter categoryId"
              />
            </div>

            {/* IMAGE URL */}
            <div className="col-md-12 mb-3">
              <label className="form-label">Image URL</label>
              <input
                type="text"
                className="form-control"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="Enter image URL"
              />
            </div>

            {/* SECTION */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Section</label>
              <select
                className="form-select"
                name="section"
                value={form.section}
                onChange={handleChange}
              >
                {sectionOptions.map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Saving..." : "Create Home Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHomeCategoryForm;
