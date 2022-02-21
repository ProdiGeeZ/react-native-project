import React, { createContext, useState } from "react";

export const UserContext = createContext();

// This context provider is passed to any component requiring the context
export const UserProvider = ({ children }) => {

  const [token, setToken] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [rerender, setRerender] = useState(false);
  const [details, setDetails] = useState({ profile: {}, photo: '' });

  return (
    <UserContext.Provider
      value={{
        details,
        id,
        password,
        rerender,
        setRerender,
        setDetails,
        setId,
        setPassword,
        setToken,
        token
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
