import ShopByCategoryCard from "./ShopByCategoryCard";

const ShopByCategory = ({ categories = [] }) => {
  return (
    <section className="container-fluid px-3 my-4">
      <div className="bg-white rounded-4 shadow-sm p-3 p-md-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-bold mb-0">Shop By Category</h3>
        </div>

        <ShopByCategoryCard categories={categories} />
      </div>
    </section>
  );
};

export default ShopByCategory;
