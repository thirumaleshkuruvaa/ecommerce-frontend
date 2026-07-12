import { useState } from "react";
import { FiSend } from "react-icons/fi";

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    onSend(input);

    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chat-footer">
      <input
        type="text"
        placeholder="Ask about products..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button className="chat-send-btn" onClick={sendMessage}>
        <FiSend />
      </button>
    </div>
  );
};

export default ChatInput;
