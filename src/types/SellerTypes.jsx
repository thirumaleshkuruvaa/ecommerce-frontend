export const PickedUpAddress = {
  name: "",
  mobile: "",
  pinCode: "",
  address: "",
  locality: "",
  city: "",
  state: "",
};
export const BankDetails = {
  accountNumber: "",
  ifscCode: "",
  accountHolderName: "",
};

export const BussinessDetails = {
  bussinessName: "",
};
export const Seller = {
  id: null,
  mobile: "",
  otp: "",
  GSTIN: "",
  pickedUpAddress: PickedUpAddress,
  bankDetails: BankDetails,
  sellerName: "",
  email: "",
  bussinessDetails: BussinessDetails,
  password: "",
  accountStatus: "",
};
export const SellerReport = {
  id: null,
  seller: Seller,
  totalEarnings: 0,
  totalOrders: 0,
  totalSales: 0,
  totalRefunds: 0,
  totalTax: 0,
  netEarnings: 0,
  canceledOrders: 0,
  totalTransactions: 0,
};
