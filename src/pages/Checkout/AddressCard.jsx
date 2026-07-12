import { useDispatch } from "react-redux";

import { deleteUserAddress } from "../../redux/address/addressThunk";
import "../../css/address/address.css";
const AddressCard = ({
  item,
  selectedAddress,
  setSelectedAddress,
  setEditData,
  setShowForm,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-3 address-card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div className="d-flex gap-3">
            <input
              type="radio"
              className="form-check-input mt-2"
              checked={selectedAddress?.id === item.id}
              onChange={() => setSelectedAddress(item)}
            />
            <div
              key={item.id}
              className="card shadow-sm mb-3 border-0 rounded-4"
            >
              <div className="card-body">
                <h6 className="fw-bold">
                  <i className="bi bi-person-fill text-primary me-2"></i>
                  {item.name}
                </h6>

                <p className="mb-1">
                  <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                  {item.address}
                </p>

                <p className="mb-1">
                  {item.locality}, {item.city}
                </p>

                <p className="mb-1">
                  {item.state} - {item.pinCode}
                </p>

                <p className="mb-0">
                  <i className="bi bi-telephone-fill text-success me-2"></i>
                  {item.mobileNumber}
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => {
                setEditData(item);
                setShowForm(true);
              }}
            >
              <i className="bi bi-pencil-square"></i>
            </button>

            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => dispatch(deleteUserAddress(item.id))}
            >
              <i className="bi bi-trash-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
