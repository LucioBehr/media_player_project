import type { Media, MediaResponse } from "../types/media";
import type { Playlist, PlaylistResponse } from "../types/playlist";

function mapMediaResponseToMedia(response: MediaResponse): Media {
  return {
    id: response.id,
    name: response.name,
    description: response.description,
    type: response.type,
    url: response.url,
    createdAt: response.createdAt,
  };
}

function mapMediaToResponse(media: Media): MediaResponse {
  return {
    id: media.id,
    name: media.name,
    description: media.description,
    type: media.type,
    url: media.url,
    createdAt: media.createdAt,
  };
}

function mapPlaylistResponseToPlaylist(response: PlaylistResponse): Playlist {
  return {
    id: response.id,
    name: response.name,
    description: response.description,
    showOnPlayer: response.showOnPlayer,
    mediaIds: [...response.mediaIds],
  };
}

function mapPlaylistToResponse(playlist: Playlist): PlaylistResponse {
  return {
    id: playlist.id,
    name: playlist.name,
    description: playlist.description,
    showOnPlayer: playlist.showOnPlayer,
    mediaIds: [...playlist.mediaIds],
  };
}

export {
  mapMediaResponseToMedia,
  mapMediaToResponse,
  mapPlaylistResponseToPlaylist,
  mapPlaylistToResponse,
};
