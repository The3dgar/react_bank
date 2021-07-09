import React, { useReducer, createContext, useEffect } from "react";
import {
  LoginData,
  RegisterData,
  User,
  LoginResponse,
} from "../interfaces/authInterfaces";
import { authReducer, AuthState } from "./AuthReducer";
import bankApi from "../api/bankApi";

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: User | null;
  status: "checking" | "authenticated" | "not-authenticated";
  signUp: (obj: RegisterData) => void;
  signIn: (obj: LoginData) => void;
  logOut: () => void;
  removeError: () => void;
};

export const AuthContext = createContext({} as AuthContextProps);

const authInitialState: AuthState = {
  status: "checking",
  token: null,
  user: null,
  errorMessage: "",
};

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch({ type: "notAuthenticated" });

    const { data, status } = await bankApi.get<LoginResponse>("/auth");
    if (status !== 200) {
      localStorage.removeItem("token");
      return dispatch({ type: "notAuthenticated" });
    }

    dispatch({
      type: "signUp",
      payload: {
        token: data.token,
        user: data.user,
      },
    });

    localStorage.setItem("token", data.token);
  };

  const signIn = async (authData: LoginData) => {
    try {
      const { data } = await bankApi.post<LoginResponse>("/auth", authData);
      dispatch({
        type: "signUp",
        payload: data,
      });

      localStorage.setItem("token", data.token);
    } catch (error) {
      console.log("response:", error.response);

      const { response } = error;

      const err = response
        ? response.status === 401
          ? "Credenciales erroneas"
          : "Sistema no disponible"
        : "Sistema no disponible";

      dispatch({
        type: "addError",
        payload: err,
      });
    }
  };

  const logOut = async () => {
    localStorage.removeItem("token");
    dispatch({ type: "logout" });
  };

  const signUp = async (obj: RegisterData) => {
    try {
      const { data } = await bankApi.post<LoginResponse>("/user", obj);

      dispatch({
        type: "signUp",
        payload: data,
      });

      localStorage.setItem("token", data.token);
    } catch (error) {
      console.log(error);
      dispatch({
        type: "addError",
        payload: "Sistema no disponible",
      });
    }
  };

  const removeError = () => {
    dispatch({ type: "removeError" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUp,
        signIn,
        logOut,
        removeError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
