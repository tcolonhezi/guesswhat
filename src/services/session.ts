import { api } from "../api/api";
export type SessionApiResponse = {
  sessionId: string;
  createdAt: number;
};

export async function createAPISession() {
  const response = await api.post<SessionApiResponse>("/session");
  return response.data;
}
