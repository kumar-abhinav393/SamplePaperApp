import type { User } from "firebase/auth";
import type { OrderByDirection, Timestamp, WhereFilterOp } from "firebase/firestore";
import type React from "react";

type PaperCode = "ASSIGNMENTS" | "QUESTION_PAPER";

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

type WhereParam = {
  fieldPath: string;
  opStr: WhereFilterOp;
  value: unknown;
}

type OrderParam = {
  fieldPath: string;
  direction?: OrderByDirection;
}

interface QueryParams {
  where?: WhereParam | WhereParam[];
  orderBy?: OrderParam | OrderParam[];
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
    name: string;
    year: number;
    code: PaperCode;
    active: boolean;
    createdBy: string;
    topicName: string;
    description: string;
    createdAt: Timestamp;
    subjectCode: string[];
    classLevels: number[];
    boardFilters: string[];
    submittedAt: Timestamp;
  }
}

export type {
  AuthState,
  PaperCode,
  AuthAction,
  ClassProps,
  BoardProps,
  QueryParams,
  SubjectProps,
  OrderParam,
  WhereParam,
  FirestoreState,
  FirestoreAction,
  AssignmentProps,
};