import { api } from "../api/api";

export type ChallengeApiRequest = {
  sessionId: string;
  theme: string;
};

export type ChallengeApiResponse = {
  word: string;
  tip: string;
};

export async function getAPIChallenge(data: ChallengeApiRequest) {
  const response = await api.post<ChallengeApiResponse>("/challenge", data, {});
  return response.data;
}
