import { Seller } from "./SellerTypes";


export const Category = {
  id: null,
  name: "",
  parentCategory: null,
  categoryId: null,
  level: 0,
};

export const Product = {
  id: null,
  title: "",
  description: "",
  mrpPrice: 0,
  sellingPrice: 0,
  discountPercent: 0,
  quantity: 0,
  color: "",
  images: [],
  numRatings: 0,

  category: Category,
  seller: Seller,

  createdAt: null, // or ""

  sizes: [],
};

