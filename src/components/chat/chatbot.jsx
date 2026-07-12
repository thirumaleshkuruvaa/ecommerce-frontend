import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { FiMessageCircle } from "react-icons/fi";

import { sendChatMessage } from "../../redux/chat/chatThunk";
import { addUserMessage } from "../../redux/chat/chatSlice";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import TypingLoader from "./TypingLoader";
import WelcomeMessage from "./WelcomeMessege";

import "../../css/chatbot/chatbot.css";

const ChatBot = () => {
  const dispatch = useDispatch();

  const { messages, loading } = useSelector((state) => state.chat);

  const [open, setOpen] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const handleSend = (text) => {
    if (!text.trim()) return;

    dispatch(addUserMessage(text.trim()));
    dispatch(sendChatMessage(text.trim()));
  };

  return (
    <>
      {!open && (
        <button className="chat-open-btn" onClick={() => setOpen(true)}>
          <i
            className="bi bi-chat-left-text-fill"
            style={{
              fontSize: "30px",
              lineHeight: 1,
              color: "#fff",
            }}
          ></i>
        </button>
      )}

      {open && (
        <div className="chat-window">
          <ChatHeader onClose={() => setOpen(false)} />

          <div className="chat-body">
            {messages.length === 1 && (
              <WelcomeMessage onSuggestion={handleSend} />
            )}

            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}

            {loading && <TypingLoader />}

            <div ref={bottomRef} />
          </div>

          <ChatInput onSend={handleSend} />
        </div>
      )}
    </>
  );
};

export default ChatBot;
