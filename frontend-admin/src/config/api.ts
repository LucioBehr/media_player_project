import { API_BASE_URL } from "./env";

const API_ENDPOINTS = {
  medias: `${API_BASE_URL}/medias`,
  media: (id: string) => `${API_BASE_URL}/medias/${id}`,
  playlists: `${API_BASE_URL}/playlists`,
  playlist: (id: string) => `${API_BASE_URL}/playlists/${id}`,
  activePlaylist: `${API_BASE_URL}/playlists/active`,
  playlistMedias: (playlistId: string) => `${API_BASE_URL}/playlists/${playlistId}/medias`,
  playlistMedia: (playlistId: string, mediaId: string) =>
    `${API_BASE_URL}/playlists/${playlistId}/medias/${mediaId}`,
} as const;

export { API_BASE_URL, API_ENDPOINTS };
