import { API_ENDPOINTS } from "../config/api";
import type { MediaResponse } from "../types/media";
import type { PlaybackSnapshot, PlaylistResponse } from "../types/playlist";
import { apiGet } from "./http-client";
import { mapMediaResponseToMedia } from "./mappers";

function orderMediasByPlaylist(mediaIds: string[], medias: MediaResponse[]) {
  const mediaById = new Map(medias.map((media) => [media.id, media]));

  return mediaIds
    .map((id) => mediaById.get(id))
    .filter((media): media is MediaResponse => media !== undefined)
    .map(mapMediaResponseToMedia);
}

const PlayerServiceApi = {
  async getPlaybackSnapshot(): Promise<PlaybackSnapshot | null> {
    const playlist = await apiGet<PlaylistResponse | null>(API_ENDPOINTS.activePlaylist);

    if (!playlist || playlist.mediaIds.length === 0) {
      return null;
    }

    const medias = await apiGet<MediaResponse[]>(API_ENDPOINTS.medias);
    const orderedMedias = orderMediasByPlaylist(playlist.mediaIds, medias);

    if (orderedMedias.length === 0) {
      return null;
    }

    return {
      playlistId: playlist.id,
      playlistName: playlist.name,
      medias: orderedMedias,
    };
  },
};

export { PlayerServiceApi };
