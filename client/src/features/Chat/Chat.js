import React from "react";
import ChatHeader from "./ChatHeader";
import "./Chat.css";
import Send from "@material-ui/icons/Send";
import Message from "../Message/Message.js";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../Reducers/userSlice";
import { selectChannelId, selectChannelName } from "../Reducers/appSlice";
import db from "../../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import axios from "../../axios";
import Pusher from "pusher-js";

Pusher.logToConsole = true;
const pusher = new Pusher("ef3178e524aee4272388", {
  cluster: "eu",
});

function Chat() {
  const channelId = useSelector(selectChannelId);
  console.log(channelId);
  const user = useSelector(selectUser);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const getConversation = (channelId) => {
    if (channelId) {
      axios
        .get(`/api/conversation/get/conversation?id=${channelId}`)
        .then((res) => {
          setMessages(res.data[0].conversation);
        });
    }
  };

  useEffect(() => {
    getConversation(channelId);

    const channel = pusher.subscribe("conversation");
    channel.bind("newMessage", function (data) {
      getConversation(channelId);
    });
  }, [channelId]);

  const sendMessage = (event) => {
    event.preventDefault();

    axios.post(`/api/message/new/message?id=${channelId}`, {
      message: input,
      timestamp: Date.now(),
      user: user,
    });

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chatheader">
        <ChatHeader channelName={channelName} />
      </div>
      <div className="chat_messages">
        {messages.map((message) => (
          <Message
            timestamp={message.timestamp}
            message={message.message}
            user={message.user}
          />
        ))}
      </div>
      <div className="chat_input">
        <form>
          <input
            type="text"
            disabled={!channelId}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Send message in #${channelName}`}
          />
          <button
            className="chat_inputButton"
            onClick={sendMessage}
            disabled={!channelId}
            type="submit"
          >
            <Send className="send" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
