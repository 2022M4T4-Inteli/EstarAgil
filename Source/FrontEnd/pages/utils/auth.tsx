import React, { createContext, useCallback, useContext, useState } from "react";
import jwt_decode from "jwt-decode";
import authAPI from "../api/auth";
import { redirect } from "next/dist/server/api-utils";

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthState {
  token: string;
}

interface AuthContextData {
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): Promise<void>;
  verifyToken(): Promise<void>;
  isAuthenticated(): boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<any> = ({ children }: any) => {
  const [data, setData] = useState<AuthState>(() => {

    if (typeof window !== "undefined") {
 
      const token = localStorage.getItem("@App:token");
      if (token) {
        return { token };
      }
    }
      return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await authAPI.create({
      email,
      password,
    });

    const { token, user} = response.data;

    localStorage.setItem("@App:token", token);
    localStorage.setItem("@App:user", user);

    setData({ token });
    // redirect("/");
  }, []);

  const signOut = useCallback(async () => {
    localStorage.removeItem("@App:token");
    localStorage.removeItem("@App:user");

    setData({} as AuthState);
  }, []);

  const isAuthenticated = useCallback( () => {
    var data = localStorage.getItem("@App:token");
    console.log(data);
    if (data == null) return false;
    return true;
  }, []);

  const verifyToken = useCallback(async () => {
    const token = localStorage.getItem("@App:token");
    const dateNow = Math.floor(Date.now() / 1000);
    var decodedToken: any;

    if (token) {
      decodedToken = jwt_decode(token);
      if (decodedToken.exp < dateNow) signOut();
    }
  }, [signOut]);

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, verifyToken, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
export { AuthProvider, useAuth };
