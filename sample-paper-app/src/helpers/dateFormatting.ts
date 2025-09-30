import { Timestamp } from "firebase/firestore";
import { format } from "date-fns";

export function formatFirestoreDate(
  timestamp: Timestamp | { seconds: number; nanoseconds: number } | null | undefined,
  dateFormat: string = "PPpp"
): string {
  if (!timestamp) return "-";

  try {
    let date: Date;

    if (timestamp instanceof Timestamp) {
      date = timestamp.toDate();
    } else if ("seconds" in timestamp && typeof timestamp.seconds === "number") {
      date = new Date(timestamp.seconds * 1000);
    } else if (timestamp instanceof Date) {
      date = timestamp;
    } else {
      return "-";
    }

    return format(date, dateFormat);
  } catch (err) {
    console.error("Error formatting Firestore timestamp:", err);
    return "-";
  }
}