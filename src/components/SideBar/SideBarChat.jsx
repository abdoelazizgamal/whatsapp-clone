import Avatar from "@mui/material/Avatar";
import { useRooms } from "../../contexts/RoomContextProvider";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import db from "../../firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
const SideBarChats = ({ addNewChat, name, id }) => {
  const { addRoom } = useRooms();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (id) {
      const getLastMessage = async () => {
        const collectionRef = collection(db, "rooms", id, "messages");
        const q = query(collectionRef, orderBy("timestamp"));
        const querySnapshot = await getDocs(q);
        setMessages(querySnapshot.docs.map((doc) => doc.data()));
      };
      getLastMessage();
    }
  });

  const creatChat = async () => {
    const roomName = prompt("please enter name for chat");
    if (roomName) {
      addRoom(roomName);
    }
  };
  return !addNewChat ? (
    <NavLink to={`rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://robohash.org/${id}?set=set4`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages[messages.length - 1]?.message}</p>
        </div>
      </div>
    </NavLink>
  ) : (
    <div className="sidebarChat" onClick={creatChat}>
      <h2>Add New Chat</h2>
    </div>
  );
};

export default SideBarChats;
