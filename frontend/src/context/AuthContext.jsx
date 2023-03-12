import { createContext, useContext, useEffect, useState } from "react";
import isAdmin from "../functions/isAdmin.model";
import authService from "../services/auth.service";
import { SocketContext } from "./CateringContext";

const initialState = {
  selfUser: [],
  isLoggedIn: false,
  login(token) {},
  logout() {},
};

const AuthContext = createContext(initialState);

const AuthContextProvider = ({ children }) => {
  const [selfUser, setSelfUser] = useState(null);
  const [isAdminState, setIsAdminState] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [token, setToken] = useState(undefined);

  const socket = useContext(SocketContext);
  useEffect(() => {
    if (isLoggedIn) {
      authService.getSingleUser().then((res) => setSelfUser(res.data));
      socket.on("update", () => {
        authService.getSingleUser().then((res) => setSelfUser(res.data));
      });
    }
    return () => {
      socket.off("update");
    };
  }, [isLoggedIn, socket]);
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      const token = user.token;
      const roles = user.roles;

      login(token);
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
      // isManager ???
      let isManagerTest = isAdmin("ROLE_MANAGER", roles);

      if (isManagerTest) {
        setIsManager(true);
      }
    }
  }, []);
  useEffect(() => {
    isLoggedIn === true
      ? localStorage.setItem("isLoggedIn", true)
      : localStorage.setItem("isLoggedIn", false);
  }, [isLoggedIn]);

  const login = (token) => {
    setIsLoggedIn(true);
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
    selfUser,
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
