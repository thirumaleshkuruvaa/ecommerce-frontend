const suggestions = [
  "Shoes",
  "Mobiles",
  "Sarees",
  "Laptops",
  "Watches",
  "Shirts",
];

const WelcomeMessage = ({ onSuggestion }) => {
  return (
    <div className="welcome-card">
      <div className="welcome-icon">🤖</div>

      <h3>Welcome to Glomo</h3>

      <p>I'm your shopping assistant. Ask me anything about products.</p>

      <div className="suggestion-title">Try asking</div>

      <div className="suggestion-list">
        {suggestions.map((item) => (
          <button key={item} onClick={() => onSuggestion(item)}>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WelcomeMessage;
