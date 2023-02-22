import { createContext, useEffect, useState } from "react";
import isAdmin from "../functions/isAdmin.model";

const initialState = {
  isLoggedIn: false,
  login(username, email, token) {},
  logout() {},
};

const AuthContext = createContext(initialState);

const AuthContextProvider = ({ children }) => {
  const [isAdminState, setIsAdminState] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [token, setToken] = useState(undefined);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      const token = user.token;
      const email = user.email;
      const username = user.username;
      const roles = user.roles;

      login(username, email, token);
      //isAdminTest  ??
      let isAdminTest = isAdmin("ROLE_ADMIN", roles);

      if (isAdminTest) {
        setIsAdminState(true);
      }
      // isModerator ???
      let isModeratorTest = isAdmin("ROLE_MODERATOR", roles);

      if (isModeratorTest) {
        setIsModerator(true);
      }
      // isModerator ???
      let isManagerTest = isAdmin("ROLE_MANAGER", roles);

      if (isManagerTest) {
        setIsManager(true);
      }
    }
  }, []);

  const login = (username, email, token) => {
    setIsLoggedIn(true);
    setEmail(email);
    setUsername(username);
    setToken(token);
    return (
      <>
        <p>התחברת בהצלחה</p>
      </>
    );
  };

  const logout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setToken(undefined);
    setEmail(undefined);
    setUsername(undefined);
    return (
      <>
        <p>התנתקת בהצלחה</p>
      </>
    );
  };

  //what we want to expose/share with the app:
  const contextValues = {
    isAdmin,
    isLoggedIn,
    username,
    token,
    email,
    login,
    logout,
    isModerator,
    isAdminState,
    isManager,
  };
  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

//the provider is only used in index.tsx <Provider>
export { AuthContext, AuthContextProvider };

//used in all the app:
export default AuthContext;
