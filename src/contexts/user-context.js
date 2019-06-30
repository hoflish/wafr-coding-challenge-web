import React from "react";
import { useFirebase } from "./firebase-context";

const UserContext = React.createContext();

function UserProvider(props) {
  const { state } = useFirebase();
  return <UserContext.Provider value={state} {...props} />;
}

function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
}

export { UserProvider, useUser };
