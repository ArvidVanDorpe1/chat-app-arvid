import React from "react";
import "./SidebarChannel.css";
import ForumIcon from "@material-ui/icons/Forum";
import { useDispatch } from "react-redux";
import { setChannelInfo } from "../Reducers/appSlice";

function SidebarChannel({ id, channelName }) {
  const dispatch = useDispatch();

  return (
    <div
      className="sidebarChannel"
      onClick={() =>
        dispatch(setChannelInfo({ channelId: id, channelName: channelName }))
      }
    >
      <h4>
        <span className="sidebarChannel_hash">
          <ForumIcon />
        </span>
        {channelName}
      </h4>
    </div>
  );
}

export default SidebarChannel;
