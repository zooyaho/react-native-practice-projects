import { createContext, useEffect, useState } from "react";

export const PushTokenContext = createContext({
  pushToken: null,
  setPushToken: () => {},
});

export const PushTokenContextProvider = ({ children }) => {
  const [pushToken, setPushToken] = useState(null);

  const value = {
    pushToken: pushToken,
    setPushToken: setPushToken,
  };

  return <PushTokenContext value={value}>{children}</PushTokenContext>;
};

export default PushTokenContextProvider;
