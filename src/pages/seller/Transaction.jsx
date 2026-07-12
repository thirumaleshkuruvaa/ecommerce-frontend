import TransactionTable from "../../components/seller/TransactionTable";

const Transaction = () => {
  return (
    <div className="container-fluid">
      <h2 className="fw-bold mb-4">Transactions</h2>

      <TransactionTable />
    </div>
  );
};

export default Transaction;
