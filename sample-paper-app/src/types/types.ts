import type { User } from "firebase/auth";
import type React from "react";

interface AuthState {
  pending: boolean;
  user: User | null;
  authIsReady: boolean;

  dispatch: React.Dispatch<AuthAction>;
}

type AuthAction =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
  | { type: "AUTH_IS_READY"; payload: User | null }
  | { type: "IS_PENDING" };

interface FirestoreState {
  isPending: boolean;
  error: string | null;
  success: boolean;
}

type FirestoreAction =
  | { type: "IS_PENDING" }
  | { type: "SUCCESS" }
  | { type: "ERROR"; payload: string };

interface ClassProps {
  id: string;
  props: {
    active: boolean;
    code: string;
    name: string;
  };
}

interface SubjectProps {
  id: string;
  props: {
    active: boolean;
    boardFilters: string[];
    classLevels: number[];
    code: string;
    name: string;
  };
}

interface BoardProps {
  id: string;
  props: {
    code: string;
    name: string;
    active: boolean;
    country: string;
    shortName: string;
    classLevels: number[];
  };
}

export type {
  AuthState,
  AuthAction,
  FirestoreState,
  FirestoreAction,
  ClassProps,
  SubjectProps,
  BoardProps,
};
