import { initialMedias, initialPlaylists } from "../mock/initial_data";
import type { Media } from "../types/media";
import type { Playlist } from "../types/playlist";

let medias: Media[] = [...initialMedias];
let playlists: Playlist[] = [...initialPlaylists];

function getMedias(): Media[] {
  return medias;
}

function setMedias(next: Media[]): void {
  medias = next;
}

function getPlaylists(): Playlist[] {
  return playlists;
}

function setPlaylists(next: Playlist[]): void {
  playlists = next;
}

export { getMedias, setMedias, getPlaylists, setPlaylists };
