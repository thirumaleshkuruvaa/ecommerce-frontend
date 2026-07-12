const ChatMessage = ({ message }) => {
  return (
    <div className={`message ${message.sender}`}>
      <div className="message-content">
        <div className="message-text">{message.text}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
