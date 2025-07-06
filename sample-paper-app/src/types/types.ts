import type { User } from "firebase/auth";
import type React from "react";

interface AuthState {
    user: User | null;
    authIsReady: boolean;
    pending: boolean;
    dispatch: React.Dispatch<AuthAction>;
}

type AuthAction =
    | { type: "LOGIN"; payload: User }
    | { type: "LOGOUT" }
    | { type: "AUTH_IS_READY"; payload: User | null }
    | { type: "PENDING" }

export type { AuthState, AuthAction }