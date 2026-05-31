import { PlayCircleOutlined } from "@ant-design/icons";
import type { Media } from "../types/media";

type MediaThumbnailProps = {
  media: Media;
  size?: "sm" | "md" | "lg";
};

function MediaThumbnail({ media, size = "md" }: MediaThumbnailProps) {
  const className = {
    sm: "h-12 w-16",
    md: "h-16 w-24",
    lg: "h-40 w-full",
  }[size];

  if (media.type === "image") {
    return <img src={media.url} alt={media.name} className={`${className} rounded object-cover bg-gray-100`} />;
  }

  return (
    <div className={`${className} flex items-center justify-center rounded bg-gray-800`}>
      <PlayCircleOutlined className="text-2xl text-white" />
    </div>
  );
}

export { MediaThumbnail };
