import { Descriptions, Image, Modal } from "antd";
import type { Media } from "../types/media";
import { getMediaTypeLabel } from "../utils/media";

type MediaPreviewModalProps = {
  media: Media | null;
  onClose: () => void;
};

function MediaPreviewModal({ media, onClose }: MediaPreviewModalProps) {
  return (
    <Modal open={Boolean(media)} title={media?.name} onCancel={onClose} footer={null} width={720}>
      {media?.type === "image" ? (
        <Image src={media.url} alt={media.name} />
      ) : (
        <video src={media?.url} controls className="w-full" />
      )}

      {media && (
        <Descriptions className="mt-4" bordered size="small" column={1}>
          <Descriptions.Item label="Tipo">{getMediaTypeLabel(media.type)}</Descriptions.Item>
          <Descriptions.Item label="Descrição">{media.description || "Sem descrição"}</Descriptions.Item>
          <Descriptions.Item label="URL">{media.url}</Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  );
}

export { MediaPreviewModal };
