import { useCallback } from "react";
import { useImageAdvance } from "../hooks/use-image-advance";
import { usePlayerStore } from "../store/player-store";
import { MediaDisplay } from "./media-display";
import { PlayerEmptyState } from "./player-empty-state";

function PlayerScreen() {
  const playlistName = usePlayerStore((state) => state.playlistName);
  const medias = usePlayerStore((state) => state.medias);
  const currentIndex = usePlayerStore((state) => state.currentIndex);
  const isLoading = usePlayerStore((state) => state.isLoading);
  const error = usePlayerStore((state) => state.error);
  const goToNext = usePlayerStore((state) => state.goToNext);

  const currentMedia = medias[currentIndex] ?? null;

  const handleAdvance = useCallback(() => {
    goToNext();
  }, [goToNext]);

  useImageAdvance(currentMedia, handleAdvance);

  if (isLoading) {
    return <PlayerEmptyState title="Carregando..." description="Buscando playlist ativa." />;
  }

  if (error) {
    return (
      <PlayerEmptyState
        title="Erro ao carregar"
        description={error}
      />
    );
  }

  if (!currentMedia) {
    return (
      <PlayerEmptyState
        title="Nenhuma playlist ativa"
        description="Marque uma playlist como “exibir no player” no painel admin."
      />
    );
  }

  return (
    <div className="player-screen">
      <header className="player-screen__header">
        <span className="player-screen__label">Playlist</span>
        <h1>{playlistName}</h1>
        <p>
          {currentIndex + 1} / {medias.length} — {currentMedia.name}
        </p>
      </header>

      <div className="player-screen__stage">
        <MediaDisplay media={currentMedia} onVideoEnded={handleAdvance} />
      </div>
    </div>
  );
}

export { PlayerScreen };
