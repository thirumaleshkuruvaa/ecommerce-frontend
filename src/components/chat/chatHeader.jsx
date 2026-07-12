import { FiX } from "react-icons/fi";

const ChatHeader = ({ onClose }) => {
  return (
    <div className="chat-header">
      <div className="chat-header-left">
        <div className="chat-avatar">G</div>

        <div>
          <h4>Glomo Assistant</h4>
          <span>Online</span>
        </div>
      </div>

      <button className="chat-close-btn" onClick={onClose}>
        <FiX />
      </button>
    </div>
  );
};

export default ChatHeader;
