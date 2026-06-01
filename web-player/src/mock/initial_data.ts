import type { Media } from "../types/media";
import type { PlaylistResponse } from "../types/playlist";

const mockMedias: Media[] = [
  {
    id: "1",
    name: "Vídeo institucional",
    description: "Vídeo principal para exibição no player.",
    type: "video",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    createdAt: "2026-05-28",
  },
  {
    id: "2",
    name: "Banner promocional",
    description: "Imagem para campanhas internas.",
    type: "image",
    url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
    createdAt: "2026-05-28",
  },
  {
    id: "3",
    name: "Comunicado geral",
    description: "Imagem informativa.",
    type: "image",
    url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200&auto=format&fit=crop",
    createdAt: "2026-05-28",
  },
];

const mockActivePlaylist: PlaylistResponse = {
  id: "1",
  name: "Recepção",
  description: "Playlist exibida na recepção.",
  showOnPlayer: true,
  mediaIds: ["1", "2", "3"],
};

export { mockMedias, mockActivePlaylist };
