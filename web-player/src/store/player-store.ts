import { create } from "zustand";
import { PlayerService } from "../services/player-service";
import type { Media } from "../types/media";

type PlayerState = {
  playlistId: string;
  playlistName: string;
  medias: Media[];
  currentIndex: number;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  goToNext: () => void;
};

function resolveCurrentIndex(previousIndex: number, previousIds: string[], nextIds: string[]) {
  if (nextIds.length === 0) {
    return 0;
  }

  const previousId = previousIds[previousIndex];

  if (previousId) {
    const sameIndex = nextIds.indexOf(previousId);

    if (sameIndex >= 0) {
      return sameIndex;
    }
  }

  return Math.min(previousIndex, nextIds.length - 1);
}

const usePlayerStore = create<PlayerState>((set, get) => ({
  playlistId: "",
  playlistName: "",
  medias: [],
  currentIndex: 0,
  isLoading: true,
  error: null,

  refresh: async () => {
    const { currentIndex, medias } = get();
    const previousIds = medias.map((media) => media.id);

    try {
      const snapshot = await PlayerService.getPlaybackSnapshot();

      if (!snapshot) {
        set({
          playlistId: "",
          playlistName: "",
          medias: [],
          currentIndex: 0,
          isLoading: false,
          error: null,
        });
        return;
      }

      const nextIds = snapshot.medias.map((media) => media.id);

      set({
        playlistId: snapshot.playlistId,
        playlistName: snapshot.playlistName,
        medias: snapshot.medias,
        currentIndex: resolveCurrentIndex(currentIndex, previousIds, nextIds),
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Não foi possível carregar a playlist.",
      });
    }
  },

  goToNext: () => {
    const { medias, currentIndex } = get();

    if (medias.length === 0) {
      return;
    }

    set({ currentIndex: (currentIndex + 1) % medias.length });
  },
}));

export { usePlayerStore };
