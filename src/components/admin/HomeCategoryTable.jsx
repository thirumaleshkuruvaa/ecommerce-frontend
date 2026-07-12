import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateHomeCategory } from "../../redux/adminhomecategory/adminHomeCategoryThunk";

const sectionOptions = [
  "ELECTRIC_CATEGORIES",
  "GRID",
  "SHOP_BY_CATEGORIES",
  "DEALS_OF_THE_DAY",
];

const HomeCategoryTable = ({ categories = [] }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.adminHomeCategory);

  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    imageUrl: "",
    categoryId: "",
    section: "",
  });

  const startEdit = (item) => {
    setEditId(item.id);
    setEditForm({
      name: item.name || "",
      imageUrl: item.imageUrl || "",
      categoryId: item.categoryId || "",
      section: item.section || "ELECTRIC_CATEGORIES",
    });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditForm({
      name: "",
      imageUrl: "",
      categoryId: "",
      section: "",
    });
  };

  const handleChange = (e) => {
    setEditForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (id) => {
    const payload = {
      name: editForm.name,
      imageUrl: editForm.imageUrl,
      categoryId: editForm.categoryId,
      section: editForm.section,
    };

    const resultAction = await dispatch(
      updateHomeCategory({
        id,
        data: payload,
      }),
    );

    if (updateHomeCategory.fulfilled.match(resultAction)) {
      setEditId(null);
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th>S.No</th>
            <th>Image</th>
            <th>Name</th>
            <th>Category ID</th>
            <th>Section</th>
            <th>Edit</th>
          </tr>
        </thead>

        <tbody>
          {categories.length > 0 ? (
            categories.map((item, index) => {
              const isEditing = editId === item.id;

              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>

                  {/* IMAGE */}
                  <td style={{ minWidth: "90px" }}>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="imageUrl"
                        value={editForm.imageUrl}
                        onChange={handleChange}
                        placeholder="Image URL"
                      />
                    ) : (
                      <img
                        src={
                          item.imageUrl ||
                          "https://via.placeholder.com/60?text=No+Image"
                        }
                        alt={item.name || "category"}
                        width="60"
                        height="60"
                        className="rounded object-fit-cover"
                      />
                    )}
                  </td>

                  {/* NAME */}
                  <td style={{ minWidth: "180px" }}>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="name"
                        value={editForm.name}
                        onChange={handleChange}
                      />
                    ) : (
                      item.name
                    )}
                  </td>

                  {/* CATEGORY ID */}
                  <td style={{ minWidth: "160px" }}>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="categoryId"
                        value={editForm.categoryId}
                        onChange={handleChange}
                      />
                    ) : (
                      item.categoryId
                    )}
                  </td>

                  {/* SECTION */}
                  <td style={{ minWidth: "200px" }}>
                    {isEditing ? (
                      <select
                        className="form-select form-select-sm"
                        name="section"
                        value={editForm.section}
                        onChange={handleChange}
                      >
                        {sectionOptions.map((section) => (
                          <option key={section} value={section}>
                            {section}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="badge bg-info text-dark">
                        {item.section}
                      </span>
                    )}
                  </td>

                  {/* ACTION */}
                  <td style={{ minWidth: "160px" }}>
                    {isEditing ? (
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleUpdate(item.id)}
                          disabled={loading}
                        >
                          Save
                        </button>

                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={cancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => startEdit(item)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No Categories Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HomeCategoryTable;
