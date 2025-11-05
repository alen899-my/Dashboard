import { createContext, useContext, useState, useEffect } from "react";
const AuthContext=createContext()
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Example: check localStorage for login
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);