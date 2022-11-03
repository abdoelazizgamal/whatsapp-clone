import Chat from "./components/chat/Chat";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Login from "./components/login/Login";
import { useUserContext } from "./contexts/UserContextProvider";

function App() {
  const { user } = useUserContext();
  return (
    <div className="App">
      <div className="app__body">
        <Routes>
          {user ? (
            <Route path="/" element={<Layout />}>
              <Route index element={<></>} />
              <Route path="rooms/:roomId" element={<Chat />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          ) : (
            <>
              <Route path="*" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
