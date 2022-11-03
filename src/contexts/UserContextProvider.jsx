import React, { createContext, useContext, useState } from "react";
const userContext = createContext(null);
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const setUserHandler = (user) => {
    setUser(user);
  };
  return (
    <userContext.Provider value={{ user, setUserHandler }}>
      {children}
    </userContext.Provider>
  );
};
export const useUserContext = () => useContext(userContext);
export default UserContextProvider;
