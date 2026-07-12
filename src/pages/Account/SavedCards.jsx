import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchSavedCards,
  addSavedCard,
  deleteSavedCard,
} from "../../redux/savedCard/savedCardThunk";

import { clearSavedCardMessage } from "../../redux/savedCard/savedCardSlice";

const SavedCards = () => {
  const dispatch = useDispatch();

  const { cards, loading, error, success } = useSelector(
    (state) => state.savedCard,
  );

  const [formData, setFormData] = useState({
    cardHolderName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cardType: "",
  });

  useEffect(() => {
    dispatch(fetchSavedCards());

    return () => {
      dispatch(clearSavedCardMessage());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddCard = async (e) => {
    e.preventDefault();

    try {
      await dispatch(addSavedCard(formData)).unwrap();

      setFormData({
        cardHolderName: "",
        cardNumber: "",
        expiryMonth: "",
        expiryYear: "",
        cardType: "",
      });
    } catch (err) {
      console.log("SAVE CARD ERROR =>", err);
    }
  };

  const handleDelete = async (cardId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this card?",
    );

    if (!confirmDelete) return;

    try {
      await dispatch(deleteSavedCard(cardId)).unwrap();
    } catch (err) {
      console.log("DELETE CARD ERROR =>", err);
    }
  };

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-4">Saved Cards</h3>

      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Add Card Form */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body">
          <h5 className="fw-bold mb-3">Add New Card</h5>

          <form onSubmit={handleAddCard}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Card Holder Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="cardHolderName"
                  value={formData.cardHolderName}
                  onChange={handleChange}
                  placeholder="Enter card holder name"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Card Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Expiry Month</label>
                <input
                  type="text"
                  className="form-control"
                  name="expiryMonth"
                  value={formData.expiryMonth}
                  onChange={handleChange}
                  placeholder="MM"
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Expiry Year</label>
                <input
                  type="text"
                  className="form-control"
                  name="expiryYear"
                  value={formData.expiryYear}
                  onChange={handleChange}
                  placeholder="YYYY"
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Card Type</label>
                <select
                  className="form-select"
                  name="cardType"
                  value={formData.cardType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="VISA">VISA</option>
                  <option value="MASTERCARD">MASTERCARD</option>
                  <option value="RUPAY">RUPAY</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-success mt-4"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Card"}
            </button>
          </form>
        </div>
      </div>

      {/* Saved Cards List */}
      {cards?.length === 0 ? (
        <div className="text-center py-5 bg-white rounded-4 shadow-sm">
          <i className="bi bi-credit-card-2-front-fill text-success display-1"></i>
          <h4 className="fw-bold mt-4">No Saved Cards</h4>
          <p className="text-muted mt-2">
            Save your credit/debit card for faster checkout.
          </p>
        </div>
      ) : (
        <div className="row g-4">
          {cards.map((card) => (
            <div className="col-md-6" key={card.id}>
              <div className="card shadow-sm border-0 rounded-4 h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h5 className="fw-bold mb-1">{card.cardType}</h5>
                      <p className="mb-1 text-muted">{card.cardHolderName}</p>
                      <p className="mb-1">{card.cardNumber}</p>
                      <small className="text-muted">
                        Expiry: {card.expiryMonth}/{card.expiryYear}
                      </small>
                    </div>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(card.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedCards;
