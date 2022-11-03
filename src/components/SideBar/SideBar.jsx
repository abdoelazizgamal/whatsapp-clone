import Avatar from "@mui/material/Avatar";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import "./SideBar.css";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import SideBarChat from "./SideBarChat";

import { useRooms } from "../../contexts/RoomContextProvider";
import { useUserContext } from "../../contexts/UserContextProvider";
const SideBar = () => {
  const { rooms } = useRooms();
  const { user } = useUserContext();
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        {user.photoURL && <Avatar src={user.photoURL} />}
        <div className="siebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="Search or Start new Chat" />
        </div>
      </div>
      <div className="sidebar__chats">
        <SideBarChat addNewChat />
        {rooms.map((room) => (
          <SideBarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
};

export default SideBar;
