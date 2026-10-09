import { createContext, useEffect, useState } from "react";
import type { SessionApiResponse } from "../services/session";

type SessionAuthProps = {
  session: null | SessionApiResponse;
  isLoading: boolean;
  saveSession: (session: SessionApiResponse) => void;
};

const LOCAL_STORAGE_KEY = "@guesswhat:session";
const SESSION_EXPIRATION_TIME = 30 * 60 * 1000;

export const SessionContext = createContext<SessionAuthProps>(
  {} as SessionAuthProps,
);

function isSessionExpired(createdAt: number): boolean {
  return Date.now() - createdAt >= SESSION_EXPIRATION_TIME;
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<null | SessionApiResponse>(null);
  const [isLoading, setIsLoading] = useState(true);

  function saveSession(data: SessionApiResponse) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    setSession(data);
  }

  function loadSession() {
    try {
      const storedSession = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedSession) {
        const parsedSession: SessionApiResponse = JSON.parse(storedSession);
        if (
          typeof parsedSession.sessionId === "string" &&
          typeof parsedSession.createdAt === "number" &&
          Number.isFinite(parsedSession.createdAt) &&
          parsedSession.createdAt <= Date.now()
        ) {
          if (isSessionExpired(parsedSession.createdAt)) {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
          } else {
            setSession(parsedSession);
          }
        } else {
          localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
      }
    } catch {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadSession();
  }, []);

  return (
    <SessionContext.Provider value={{ session, isLoading, saveSession }}>
      {children}
    </SessionContext.Provider>
  );
}
