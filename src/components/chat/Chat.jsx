import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import { useRooms } from "../../contexts/RoomContextProvider";
import { useUserContext } from "../../contexts/UserContextProvider";
const Chat = () => {
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const { getSpecificRoom, roomName, getMessagesOfRoom, messages, addMessage } =
    useRooms();
  const { user } = useUserContext();

  useEffect(() => {
    if (roomId) {
      getSpecificRoom(roomId);
      getMessagesOfRoom(roomId);
    }
  }, [roomId, getMessagesOfRoom, getSpecificRoom]);

  const sendMessage = (e) => {
    e.preventDefault();
    setInput("");
    addMessage(roomId, input, user);
  };
  const HandleInput = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://robohash.org/${roomId}?set=set4`} />
        <div className="chat__header__info">
          <h3>{roomName} </h3>
          <p>
            last seen at
            {new Date(
              messages[messages?.length - 1]?.timestamp?.toDate()
            )?.toUTCString()}
          </p>
        </div>
        <div className="chat__header__right">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages &&
          messages?.map((message, index) => (
            <p
              className={`chat__message ${
                message?.name === user?.displayName && "chat__reciver"
              }`}
              key={index}
            >
              {message.message}
              <span className="chat__name">{message?.name}</span>
              <span className="chat__timestamp">
                {new Date(message?.timestamp?.toDate())?.toUTCString()}
              </span>
            </p>
          ))}
      </div>
      <div className="chat__footer">
        <IconButton>
          <InsertEmoticon />
        </IconButton>
        <form action="" onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Type a message"
            value={input}
            onChange={HandleInput}
          />
          <button type="submit" onClick={sendMessage}>
            Send a Message
          </button>
        </form>
        <IconButton>
          <Mic />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;
