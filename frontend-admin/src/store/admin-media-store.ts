import { create } from "zustand";
import { MediaService } from "../services/media-service";
import { PlaylistService } from "../services/playlist-service";
import {
  mapMediaResponseToMedia,
  mapPlaylistResponseToPlaylist,
} from "../services/mappers";
import { buildCreateMediaFormData, buildUpdateMediaFormData } from "../utils/form-data";
import type { MediaFormValues, CreateMediaRequest, UpdateMediaRequest } from "../types/media";
import type { Media } from "../types/media";
import type { Playlist, PlaylistFormValues } from "../types/playlist";

type AdminMediaState = {
  medias: Media[];
  playlists: Playlist[];
  selectedPlaylistId: string;
  loadMedias: () => Promise<void>;
  loadPlaylists: () => Promise<void>;
  createMedia: (payload: MediaFormValues) => Promise<void>;
  updateMedia: (mediaId: string, payload: MediaFormValues) => Promise<void>;
  deleteMedia: (mediaId: string) => Promise<void>;
  createPlaylist: (payload: PlaylistFormValues) => Promise<string>;
  updatePlaylist: (playlistId: string, payload: PlaylistFormValues) => Promise<void>;
  deletePlaylist: (playlistId: string) => Promise<void>;
  selectPlaylist: (playlistId: string) => void;
  addMediaToPlaylist: (playlistId: string, mediaId: string) => Promise<void>;
  removeMediaFromPlaylist: (playlistId: string, mediaId: string) => Promise<void>;
};

const useAdminMediaStore = create<AdminMediaState>((set, get) => ({
  medias: [],
  playlists: [],
  selectedPlaylistId: "",

  loadMedias: async () => {
    const responses = await MediaService.getMedias();
    set({ medias: responses.map(mapMediaResponseToMedia) });
  },

  loadPlaylists: async () => {
    const responses = await PlaylistService.getPlaylists();
    const playlists = responses.map(mapPlaylistResponseToPlaylist);
    const { selectedPlaylistId } = get();
    const hasSelected = playlists.some((playlist) => playlist.id === selectedPlaylistId);

    set({
      playlists,
      selectedPlaylistId: hasSelected ? selectedPlaylistId : playlists[0]?.id ?? "",
    });
  },

  createMedia: async (payload) => {
    const request: CreateMediaRequest | FormData = payload.file
      ? buildCreateMediaFormData(payload)
      : {
          name: payload.name,
          description: payload.description,
          type: payload.type,
          url: payload.url,
        };
    const response = await MediaService.createMedia(request);
    const media = mapMediaResponseToMedia(response);

    set((state) => ({ medias: [media, ...state.medias] }));
  },

  updateMedia: async (mediaId, payload) => {
    const request: UpdateMediaRequest | FormData = payload.file
      ? buildUpdateMediaFormData(payload)
      : {
          name: payload.name,
          description: payload.description,
          type: payload.type,
          url: payload.url,
        };
    const response = await MediaService.updateMedia(mediaId, request);
    const media = mapMediaResponseToMedia(response);

    set((state) => ({
      medias: state.medias.map((item) => (item.id === mediaId ? media : item)),
    }));
  },

  deleteMedia: async (mediaId) => {
    await MediaService.deleteMedia(mediaId);

    set((state) => ({
      medias: state.medias.filter((media) => media.id !== mediaId),
      playlists: state.playlists.map((playlist) => ({
        ...playlist,
        mediaIds: playlist.mediaIds.filter((id) => id !== mediaId),
      })),
    }));
  },

  createPlaylist: async (payload) => {
    const response = await PlaylistService.createPlaylist(payload);
    const playlist = mapPlaylistResponseToPlaylist(response);

    set((state) => ({
      playlists: [playlist, ...state.playlists],
      selectedPlaylistId: playlist.id,
    }));

    return playlist.id;
  },

  updatePlaylist: async (playlistId, payload) => {
    const response = await PlaylistService.updatePlaylist(playlistId, payload);
    const playlist = mapPlaylistResponseToPlaylist(response);

    set((state) => ({
      playlists: state.playlists.map((item) => (item.id === playlistId ? playlist : item)),
    }));
  },

  deletePlaylist: async (playlistId) => {
    await PlaylistService.deletePlaylist(playlistId);

    const { selectedPlaylistId, playlists } = get();
    const remaining = playlists.filter((playlist) => playlist.id !== playlistId);
    const nextSelected =
      selectedPlaylistId === playlistId ? remaining[0]?.id ?? "" : selectedPlaylistId;

    set({
      playlists: remaining,
      selectedPlaylistId: nextSelected,
    });
  },

  selectPlaylist: (playlistId) => {
    set({ selectedPlaylistId: playlistId });
  },

  addMediaToPlaylist: async (playlistId, mediaId) => {
    const response = await PlaylistService.addMediaToPlaylist(playlistId, mediaId);
    const playlist = mapPlaylistResponseToPlaylist(response);

    set((state) => ({
      playlists: state.playlists.map((item) => (item.id === playlistId ? playlist : item)),
    }));
  },

  removeMediaFromPlaylist: async (playlistId, mediaId) => {
    const response = await PlaylistService.removeMediaFromPlaylist(playlistId, mediaId);
    const playlist = mapPlaylistResponseToPlaylist(response);

    set((state) => ({
      playlists: state.playlists.map((item) => (item.id === playlistId ? playlist : item)),
    }));
  },
}));

export { useAdminMediaStore };
