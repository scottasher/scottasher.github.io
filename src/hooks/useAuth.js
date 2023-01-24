import { createContext, useContext, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import {
  fetchCurrentUser,
  selectCurrentUser,
  userLogin,
  userLogout,
  userRegister,
} from "../redux/reducers/accountSlice";
import { deleteTokens } from "../utils/authority";
import PageLoading from "../components/PageLoading";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", { active: false });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const accountStatus = useSelector((state) => state.account.status);
  const currentUser = useSelector(selectCurrentUser);

  const loading = accountStatus === "idle" || accountStatus === "loading";

  useEffect(() => {
    (async () => {
      if (accountStatus === "idle") {
        try {
          const { user } = await dispatch(fetchCurrentUser()).unwrap();
          setUser(user);
          navigate(location);
        } catch (err) {}
      }
    })();
  }, [accountStatus, dispatch, currentUser, setUser, navigate, location]);

  const login = async (data) => {
    const res = await dispatch(userLogin(data)).unwrap();
    if (res.user) {
      setUser(res.user);
      navigate("/", { replace: true });
    }
  };

  const register = async ({ user }) => {
    const res = await dispatch(userRegister(user)).unwrap();

    toast(res.message, {
      toastId: "userRegister",
      type: res.status,
    });
    if (res.user.email) {
      setUser(res.user);
      navigate("/account/profile", { replace: true });
    }
  };

  const logout = () => {
    dispatch(userLogout());
    setUser({ active: false });
    deleteTokens();
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      loading,
      register,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  return (
    <AuthContext.Provider value={value}>
      {loading ? <PageLoading /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
