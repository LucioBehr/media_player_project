import type { Media } from "../types/media";

type MediaDisplayProps = {
  media: Media;
  onVideoEnded: () => void;
};

function MediaDisplay({ media, onVideoEnded }: MediaDisplayProps) {
  if (media.type === "image") {
    return (
      <img
        key={media.id}
        src={media.url}
        alt={media.name}
        className="player-media player-media--fade"
      />
    );
  }

  return (
    <video
      key={media.id}
      src={media.url}
      className="player-media player-media--fade"
      autoPlay
      muted
      playsInline
      onEnded={onVideoEnded}
    />
  );
}

export { MediaDisplay };
