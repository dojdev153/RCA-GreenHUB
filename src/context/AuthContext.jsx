import { createContext, useContext, useMemo, useState } from "react";
import { roleOptions, users } from "../data/mockData.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [role, setRole] = useState("student");

  const value = useMemo(() => {
    const roleInfo = roleOptions.find((item) => item.value === role) ?? roleOptions[0];
    const user = users[role] ?? users.student;

    return {
      role,
      setRole,
      roleInfo,
      user,
      isMockAuthenticated: true,
      loginAs: setRole,
    };
  }, [role]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
