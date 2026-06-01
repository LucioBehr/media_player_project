import type { Media } from "./media";

type PlaylistResponse = {
  id: string;
  name: string;
  description: string;
  showOnPlayer: boolean;
  mediaIds: string[];
};

type PlaybackSnapshot = {
  playlistId: string;
  playlistName: string;
  medias: Media[];
};

export type { PlaylistResponse, PlaybackSnapshot };
