import { mockActivePlaylist, mockMedias } from "../mock/initial_data";
import type { PlaybackSnapshot } from "../types/playlist";

const PlayerServiceMock = {
  async getPlaybackSnapshot(): Promise<PlaybackSnapshot | null> {
    const medias = mockActivePlaylist.mediaIds
      .map((id) => mockMedias.find((media) => media.id === id))
      .filter((media) => media !== undefined);

    if (medias.length === 0) {
      return null;
    }

    return {
      playlistId: mockActivePlaylist.id,
      playlistName: mockActivePlaylist.name,
      medias,
    };
  },
};

export { PlayerServiceMock };
