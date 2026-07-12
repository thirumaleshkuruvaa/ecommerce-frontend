// const UserAddressesCard = () => {
//   return (
//     <div>
//       <h3 className="fw-bold mb-4">Saved Addresses</h3>

//       <div className="card border-0 shadow-sm rounded-4">
//         <div className="card-body">
//           <h5 className="fw-bold">Zosh</h5>

//           <p className="mb-1">Ambavadi Choke</p>

//           <p className="mb-1">Bangalore, Karnataka</p>

//           <p className="mb-0">Mobile : 9023379136</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserAddressesCard;
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAddresses } from "../../redux/address/addressThunk";

const UserAddressesCard = () => {
  const dispatch = useDispatch();
  const { addresses } = useSelector((state) => state.address);

  useEffect(() => {
    dispatch(fetchUserAddresses());
  }, [dispatch]);

  return (
    <div>
      <h3 className="fw-bold mb-4">Saved Addresses</h3>

      {addresses.map((item) => (
        <div key={item.id} className="card shadow-sm mb-3 p-3">
          <h6 className="fw-bold">{item.name}</h6>

          <p className="mb-1">{item.address}</p>

          <p className="mb-1">
            {item.city}, {item.state}
          </p>

          <p className="mb-0">Mobile: {item.mobileNumber}</p>
        </div>
      ))}
    </div>
  );
};

export default UserAddressesCard;
