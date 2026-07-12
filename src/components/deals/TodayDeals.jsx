import DealCard from "./DealCard";
import "../../css/DealCard.css";

const TodaysDeals = ({ deals = [] }) => {
  return (
    <section className="deals-wrapper container-fluid my-4">
      <div className="deals-header d-flex justify-content-between align-items-center mb-3">
        <h2 className="deals-heading mb-0">Today’s Deals</h2>
      </div>

      {deals?.length > 0 ? (
        <div className="deals-grid">
          {deals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      ) : (
        <div className="deals-empty">No deals available right now.</div>
      )}
    </section>
  );
};

export default TodaysDeals;
