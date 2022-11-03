import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import db from "./../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  getDoc,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";

import { serverTimestamp } from "firebase/firestore";

const RoomContext = createContext([]);
const RoomContextProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState("");
  //Load Data initially
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "rooms"), (snapshot) => {
      setRooms(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //add Room To Firebase and to State
  const addRoom = async (roomName) => {
    // Add a new document with a generated id.
    // eslint-disable-next-line
    const docRef = await addDoc(collection(db, "rooms"), {
      name: roomName,
    });

    // setRooms((prev) => [...prev, { id: docRef.id, data: { name: roomName } }]);
  };

  const getSpecificRoom = useCallback(async (roomId) => {
    const docRef = doc(db, "rooms", roomId);
    const docSnap = await getDoc(docRef);
    setRoomName(docSnap.data().name);
  }, []);
  const getMessagesOfRoom = useCallback(async (roomId) => {
    const collectionRef = collection(db, "rooms", roomId, "messages");
    const q = query(collectionRef, orderBy("timestamp"));
    const querySnapshot = await getDocs(q);
    setMessages(querySnapshot.docs.map((doc) => doc.data()));
    // const collectionRef = onSnapshot(
    //   collection(db, "rooms", roomId, "messages"),
    //   (snapshot) => {
    //     snapshot.docs.map((doc) => console.log(doc.data()));
    //   }
    // );
  }, []);
  const addMessage = async (roomId, input, user) => {
    // eslint-disable-next-line no-unused-vars
    const docRef = await addDoc(collection(db, "rooms", roomId, "messages"), {
      message: input,
      name: user.displayName,
      timestamp: serverTimestamp(),
    });
    getMessagesOfRoom(roomId);
  };
  return (
    <RoomContext.Provider
      value={{
        rooms,
        setRooms,
        addRoom,
        getSpecificRoom,
        roomName,
        getMessagesOfRoom,
        messages,
        addMessage,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
export const useRooms = () => useContext(RoomContext);
export default RoomContextProvider;
