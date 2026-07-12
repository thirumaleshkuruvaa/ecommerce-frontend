// export const buildPathFromCategoryId = (categoryId) => {
//   if (!categoryId) return "/products";

//   const parts = categoryId
//     .split("/")
//     .map((item) => item.trim())
//     .filter(Boolean);

//   if (parts.length === 0) return "/products";

//   return `/products/${parts.map(encodeURIComponent).join("/")}`;
// };

export const buildCategoryPath = (categoryId) => {
  if (!categoryId) return "/products";

  const parts = categoryId
    .split("/")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => encodeURIComponent(item));

  return `/products/${parts.join("/")}`;
};
