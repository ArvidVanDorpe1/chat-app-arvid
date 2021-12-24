import React from "react";
import "./ChatHeader.css";
import PeopleAltRounded from "@material-ui/icons/PeopleAltRounded";

function ChatHeader({ channelName }) {
  return (
    <div className="chatHeader">
      <div className="chatnaam">
        <h3>{channelName}</h3>
      </div>
      <div className="peopleicon">
        <PeopleAltRounded />
      </div>
    </div>
  );
}

export default ChatHeader;
