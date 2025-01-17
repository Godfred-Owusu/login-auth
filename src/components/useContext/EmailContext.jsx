import React, { createContext, useState } from "react";

// Create a Context
const EmailContext = createContext();

// Create a Provider Component

const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
};

export { EmailContext, EmailProvider };
