import { api } from "../api/api";

export type ThemesApiResponse = {
  themes: string[];
};

export async function getThemes() {
  const response = await api.get<ThemesApiResponse>("themes");
  return response.data;
}
