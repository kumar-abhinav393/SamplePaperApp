import type { User } from "firebase/auth";
import type { Timestamp, WhereFilterOp } from "firebase/firestore";
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

interface QueryParams {
  fieldPath: string;
  opStr: WhereFilterOp;
  value: unknown;
}

interface ClassProps {
  id: string;
  props: {
    active: boolean;
    code: number;
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

interface AssignmentProps {
  id: string;
  props: {
    code: string;
    name: string;
    active: boolean;
    createdAt: Timestamp;
    createdBy: string;
    topicName: string;
    description: string;
    subjectCode: string[];
    classLevels: number[];
    boardFilters: string[];
  }
}

export type {
  AuthState,
  AuthAction,
  ClassProps,
  BoardProps,
  QueryParams,
  SubjectProps,
  FirestoreState,
  FirestoreAction,
  AssignmentProps,
};
