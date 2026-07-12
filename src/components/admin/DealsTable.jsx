import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDeal,
  getAllDeals,
  updateDeal,
} from "../../redux/deal/dealThunk";

const DealsTable = ({ deals = [] }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.deal);

  const [editId, setEditId] = useState(null);
  const [editDiscount, setEditDiscount] = useState("");

  const startEdit = (deal) => {
    setEditId(deal.id);
    setEditDiscount(deal.discount || "");
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditDiscount("");
  };

  const handleUpdate = async (deal) => {
    if (!editDiscount) {
      alert("Please enter discount");
      return;
    }

    const payload = {
      discount: Number(editDiscount),
      category: {
        id: deal.category?.id,
      },
    };

    const result = await dispatch(
      updateDeal({
        id: deal.id,
        dealData: payload,
      }),
    );

    if (updateDeal.fulfilled.match(result)) {
      setEditId(null);
      setEditDiscount("");
      dispatch(getAllDeals());
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this deal?",
    );
    if (!confirmDelete) return;

    const result = await dispatch(deleteDeal(id));

    if (deleteDeal.fulfilled.match(result)) {
      dispatch(getAllDeals());
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th>S.No</th>
            <th>Image</th>
            <th>Category</th>
            <th>Category Path</th>
            <th>Discount</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {deals.length > 0 ? (
            deals.map((deal, index) => {
              const isEditing = editId === deal.id;

              return (
                <tr key={deal.id}>
                  <td>{index + 1}</td>

                  <td>
                    <img
                      src={
                        deal.category?.imageUrl ||
                        "https://via.placeholder.com/60?text=No+Image"
                      }
                      alt={deal.category?.name || "category"}
                      width="60"
                      height="60"
                      className="rounded object-fit-cover"
                    />
                  </td>

                  <td>{deal.category?.name || "-"}</td>
                  <td>{deal.category?.categoryId || "-"}</td>

                  <td style={{ minWidth: "140px" }}>
                    {isEditing ? (
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={editDiscount}
                        onChange={(e) => setEditDiscount(e.target.value)}
                        min="1"
                        max="100"
                      />
                    ) : (
                      <span className="badge bg-success">
                        {deal.discount}% OFF
                      </span>
                    )}
                  </td>

                  <td style={{ minWidth: "170px" }}>
                    {isEditing ? (
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleUpdate(deal)}
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
                        onClick={() => startEdit(deal)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                    )}
                  </td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(deal.id)}
                      disabled={loading}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4">
                No Deals Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DealsTable;
