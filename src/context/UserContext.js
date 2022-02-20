import React, { createContext, useState } from "react";

export const UserContext = createContext();

// This context provider is passed to any component requiring the context
export const UserProvider = ({ children }) => {

  const [token, setToken] = useState('');
  const [id, setId] = useState('');

  return (
    <UserContext.Provider
      value={{
        token,
        id,
        setToken,
        setId
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
