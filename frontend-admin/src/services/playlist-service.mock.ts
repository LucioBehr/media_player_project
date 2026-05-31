import type {
  CreatePlaylistRequest,
  PlaylistResponse,
  UpdatePlaylistRequest,
} from "../types/playlist";
import { mapPlaylistToResponse } from "./mappers";
import { getMedias, getPlaylists, setPlaylists } from "./mock-store";

const PlaylistServiceMock = {
  async getPlaylists(): Promise<PlaylistResponse[]> {
    return Promise.resolve(getPlaylists().map(mapPlaylistToResponse));
  },

  async getActivePlaylist(): Promise<PlaylistResponse | null> {
    const active = getPlaylists().find((playlist) => playlist.showOnPlayer);
    return Promise.resolve(active ? mapPlaylistToResponse(active) : null);
  },

  async createPlaylist(payload: CreatePlaylistRequest): Promise<PlaylistResponse> {
    const newPlaylist = {
      id: crypto.randomUUID(),
      name: payload.name,
      description: payload.description ?? "",
      showOnPlayer: payload.showOnPlayer,
      mediaIds: [] as string[],
    };

    setPlaylists([newPlaylist, ...getPlaylists()]);

    return Promise.resolve(mapPlaylistToResponse(newPlaylist));
  },

  async updatePlaylist(id: string, payload: UpdatePlaylistRequest): Promise<PlaylistResponse> {
    const existing = getPlaylists().find((playlist) => playlist.id === id);

    if (!existing) {
      return Promise.reject(new Error("Playlist não encontrada."));
    }

    const updatedPlaylist = {
      ...existing,
      name: payload.name,
      description: payload.description ?? "",
      showOnPlayer: payload.showOnPlayer,
    };

    setPlaylists(getPlaylists().map((playlist) => (playlist.id === id ? updatedPlaylist : playlist)));

    return Promise.resolve(mapPlaylistToResponse(updatedPlaylist));
  },

  async deletePlaylist(id: string): Promise<void> {
    setPlaylists(getPlaylists().filter((playlist) => playlist.id !== id));

    return Promise.resolve();
  },

  async addMediaToPlaylist(playlistId: string, mediaId: string): Promise<PlaylistResponse> {
    const mediaExists = getMedias().some((media) => media.id === mediaId);

    if (!mediaExists) {
      return Promise.reject(new Error("Mídia não encontrada."));
    }

    const playlists = getPlaylists().map((playlist) => {
      if (playlist.id !== playlistId) return playlist;

      if (playlist.mediaIds.includes(mediaId)) return playlist;

      return {
        ...playlist,
        mediaIds: [...playlist.mediaIds, mediaId],
      };
    });

    setPlaylists(playlists);

    const updated = playlists.find((playlist) => playlist.id === playlistId);

    if (!updated) {
      return Promise.reject(new Error("Playlist não encontrada."));
    }

    return Promise.resolve(mapPlaylistToResponse(updated));
  },

  async removeMediaFromPlaylist(playlistId: string, mediaId: string): Promise<PlaylistResponse> {
    const playlists = getPlaylists().map((playlist) => {
      if (playlist.id !== playlistId) return playlist;

      return {
        ...playlist,
        mediaIds: playlist.mediaIds.filter((id) => id !== mediaId),
      };
    });

    setPlaylists(playlists);

    const updated = playlists.find((playlist) => playlist.id === playlistId);

    if (!updated) {
      return Promise.reject(new Error("Playlist não encontrada."));
    }

    return Promise.resolve(mapPlaylistToResponse(updated));
  },
};

export { PlaylistServiceMock };
