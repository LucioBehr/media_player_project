import { useEffect } from "react";
import { IMAGE_DISPLAY_MS } from "../config/player";
import type { Media } from "../types/media";

function useImageAdvance(media: Media | null, onAdvance: () => void) {
  useEffect(() => {
    if (!media || media.type !== "image") {
      return;
    }

    const timeoutId = window.setTimeout(onAdvance, IMAGE_DISPLAY_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [media, onAdvance]);
}

export { useImageAdvance };
