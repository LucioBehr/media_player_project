import { API_ENDPOINTS } from "../config/api";
import type {
  CreatePlaylistRequest,
  PlaylistResponse,
  UpdatePlaylistRequest,
} from "../types/playlist";
import { apiDelete, apiDeleteJson, apiGet, apiPost, apiPut } from "./http-client";

const PlaylistServiceApi = {
  async getPlaylists(): Promise<PlaylistResponse[]> {
    return apiGet<PlaylistResponse[]>(API_ENDPOINTS.playlists);
  },

  async getActivePlaylist(): Promise<PlaylistResponse | null> {
    return apiGet<PlaylistResponse | null>(API_ENDPOINTS.activePlaylist);
  },

  async createPlaylist(payload: CreatePlaylistRequest): Promise<PlaylistResponse> {
    return apiPost<PlaylistResponse>(API_ENDPOINTS.playlists, payload);
  },

  async updatePlaylist(id: string, payload: UpdatePlaylistRequest): Promise<PlaylistResponse> {
    return apiPut<PlaylistResponse>(API_ENDPOINTS.playlist(id), payload);
  },

  async deletePlaylist(id: string): Promise<void> {
    return apiDelete(API_ENDPOINTS.playlist(id));
  },

  async addMediaToPlaylist(playlistId: string, mediaId: string): Promise<PlaylistResponse> {
    return apiPost<PlaylistResponse>(API_ENDPOINTS.playlistMedias(playlistId), { mediaId });
  },

  async removeMediaFromPlaylist(playlistId: string, mediaId: string): Promise<PlaylistResponse> {
    return apiDeleteJson<PlaylistResponse>(API_ENDPOINTS.playlistMedia(playlistId, mediaId));
  },
};

export { PlaylistServiceApi };
