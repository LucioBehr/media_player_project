/**
 * Entidade interna de playlist.
 *
 * O campo `showOnPlayer` indica se a playlist deve ser exibida no Player React separado.
 * Futura integração: GET /playlists/active (API_ENDPOINTS.activePlaylist) retorna
 * a playlist marcada para exibição no player.
 */
type Playlist = {
  id: string;
  name: string;
  description: string;
  showOnPlayer: boolean;
  mediaIds: string[];
};

type PlaylistFormValues = {
  name: string;
  description?: string;
  showOnPlayer: boolean;
};

type CreatePlaylistRequest = {
  name: string;
  description?: string;
  showOnPlayer: boolean;
};

type UpdatePlaylistRequest = {
  name: string;
  description?: string;
  showOnPlayer: boolean;
};

type PlaylistResponse = {
  id: string;
  name: string;
  description: string;
  showOnPlayer: boolean;
  mediaIds: string[];
};

export type {
  Playlist,
  PlaylistFormValues,
  CreatePlaylistRequest,
  UpdatePlaylistRequest,
  PlaylistResponse,
};
