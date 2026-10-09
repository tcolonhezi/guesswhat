import { use } from "react";
import { SessionContext } from "../context/SessionContext";

export function useSession() {
  const context = use(SessionContext);
  return context;
}
