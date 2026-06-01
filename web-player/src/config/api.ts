import { API_BASE_URL } from "./env";

const API_ENDPOINTS = {
  medias: `${API_BASE_URL}/medias`,
  activePlaylist: `${API_BASE_URL}/playlists/active`,
} as const;

export { API_BASE_URL, API_ENDPOINTS };
