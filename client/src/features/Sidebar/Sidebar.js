import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import SidebarChannel from "./SidebarChannel";
import AddIcon from "@material-ui/icons/Add";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../Reducers/userSlice";
import ExitToApp from "@material-ui/icons/ExitToApp";
import { auth } from "../../firebase";
import axios from "../../axios.js";
import Pusher from "pusher-js";

Pusher.logToConsole = true;
const pusher = new Pusher("ef3178e524aee4272388", {
  cluster: "eu",
});

function Sidebar() {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  const getChannels = () => {
    console.log("voor de axios call");
    axios.get("/api/channel/get/channelList").then((res) => {
      console.log(res.data);
      setChannels(res.data);
    });
  };

  useEffect(() => {
    getChannels();

    const channel = pusher.subscribe("channels");
    channel.bind("newChannel", function (data) {
      getChannels();
    });
  }, []);

  const handleAddChannel = (e) => {
    e.preventDefault();
    console.log("nieuwe channel toevoegen");
    const channelName = prompt("Enter a new channel name");

    if (channelName) {
      axios.post("/api/channel/new/channel", {
        channelName: channelName,
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar_top">
        <h3>Chat-App</h3>
      </div>
      <div className="sidebar_channels">
        <div className="sidebar_channelsHeader">
          <div className="sidebar_header">
            <h4>Text Channels</h4>
          </div>
          <AddIcon onClick={handleAddChannel} className="sidebar_addChannel" />
        </div>
      </div>
      <div className="sidebar_channelsList">
        {channels.map((channel) => (
          <SidebarChannel
            key={channel._id}
            id={channel._id}
            channelName={channel.channelName}
          />
        ))}
      </div>
      <div className="sidebar_profile">
        <Avatar src={user.photo} />
        <div className="sidebar_profileInfo">
          <h3>{user.displayName}</h3>
          <p>{user.uid}</p>
        </div>
        <ExitToApp onClick={() => auth.signOut()} className="exit" />
      </div>
    </div>
  );
}

export default Sidebar;
