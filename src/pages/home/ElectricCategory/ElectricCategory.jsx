import ElectricCategoryCard from "./ElectricCategoryCard";

const ElectricCategory = ({ categories = [] }) => {
  return (
    <section className="container-fluid px-3 my-4">
      <div className="bg-white rounded-4 shadow-sm p-3 p-md-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-bold mb-0">Electronics</h3>
        </div>

        <ElectricCategoryCard categories={categories} />
      </div>
    </section>
  );
};

export default ElectricCategory;
