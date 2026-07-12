const DealCategoryTable = ({ categories = [] }) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th>No</th>
            <th>ID</th>
            <th>Image</th>
            <th>Category</th>
            <th>Category Path</th>
            <th>Section</th>
          </tr>
        </thead>

        <tbody>
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <tr key={category.id}>
                <td>{index + 1}</td>
                <td>{category.id}</td>

                <td>
                  <img
                    src={
                      category.imageUrl ||
                      "https://via.placeholder.com/60?text=No+Image"
                    }
                    alt={category.name || "category"}
                    width="60"
                    height="60"
                    className="rounded object-fit-cover"
                  />
                </td>

                <td>{category.name || "-"}</td>
                <td>{category.categoryId || "-"}</td>

                <td>
                  <span className="badge bg-info text-dark">
                    {category.section}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No Categories Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DealCategoryTable;
