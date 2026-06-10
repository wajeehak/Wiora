import { createContext, useContext, useState, useEffect } from "react";

const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("wiora_admin");
    if (saved === "true") {
      setIsAdmin(true);
    }
  }, []);

  const login = (password) => {
    // simple password (you can change this anytime)
    if (password === "wiora123") {
      setIsAdmin(true);
      localStorage.setItem("wiora_admin", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem("wiora_admin");
  };

  return (
    <AdminAuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AdminAuthContext);