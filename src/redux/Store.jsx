import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../redux/Auth/authSlice";
import sellerReducer from "../redux/seller/sellerSlice";
import sellerProductReducer from "../redux/sellerProducts/SellerProductSlice";
import productReducer from "../redux/customer/ProductSlice";
import reviewReducer from "../redux/review/reviewslice";
import cartReducer from "../redux/cart/cartSlice";
import couponReducer from "../redux/coupon/couponSlice";
import adminCouponReducer from "../redux/admincoupon/admincouponSlice";
import wishlistReducer from "../redux/wishlist/wishlistSlice";
import addressReducer from "../redux/address/addressSlice";
import orderReducer from "../redux/order/orderSlice";
import sellerOrderReducer from "../redux/sellerOrder/sellerOrderSlice";
import transactionReducer from "../redux/transaction/transactionSlice";
import savedCardReducer from "../redux/savedcard/savedCardSlice";
import adminSellerReducer from "../redux/adminseller/adminSellerSlice";
import adminAuthReducer from "../redux/adminAuth/adminAuthSlice";
import dealReducer from "../redux/deal/dealSlice";
import adminHomeCategoryReducer from "../redux/adminhomecategory/adminHomeCategorySlice";
import homeReducer from "../redux/home/homeSlice";
import paymentReducer from "../redux/payment/paymentSlice";
import chatReducer from "../redux/chat/chatSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    seller: sellerReducer,
    sellerProduct: sellerProductReducer,
    product: productReducer,
    review: reviewReducer,
    cart: cartReducer,
    coupon: couponReducer,
    adminCoupon: adminCouponReducer,
    wishlist: wishlistReducer,
    address: addressReducer,
    order: orderReducer,
    sellerOrder: sellerOrderReducer,
    transaction: transactionReducer,
    savedCard: savedCardReducer,
    adminSeller: adminSellerReducer,
    adminAuth: adminAuthReducer,
    deal: dealReducer,
    adminHomeCategory: adminHomeCategoryReducer,
    home: homeReducer,
    payment: paymentReducer,
    chat: chatReducer,
  },
});

export default store;
