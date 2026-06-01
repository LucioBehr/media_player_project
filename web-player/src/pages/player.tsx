import { useEffect } from "react";
import { PLAYLIST_POLL_INTERVAL_MS } from "../config/player";
import { PlayerScreen } from "../components/player-screen";
import { usePlayerStore } from "../store/player-store";

function PlayerPage() {
  const refresh = usePlayerStore((state) => state.refresh);

  useEffect(() => {
    void refresh();

    const intervalId = window.setInterval(() => {
      void refresh();
    }, PLAYLIST_POLL_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [refresh]);

  return <PlayerScreen />;
}

export default PlayerPage;
