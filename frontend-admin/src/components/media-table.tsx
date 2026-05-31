import { useMemo, useState } from "react";
import { App, Card, Empty, Flex, Input, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { Media, MediaType } from "../types/media";
import { useAdminMediaStore } from "../store/admin-media-store";
import { getMediaTypeLabel, getMediaTypeIcon } from "../utils/media";
import { MediaThumbnail } from "./media-thumbnail";
import { MediaActions } from "./media-actions";
import { MediaPreviewModal } from "./media-preview-modal";

const { Text } = Typography;

type MediaTableProps = {
  onEditMedia: (media: Media) => void;
};

function MediaTable({ onEditMedia }: MediaTableProps) {
  const { message } = App.useApp();
  const medias = useAdminMediaStore((state) => state.medias);
  const playlists = useAdminMediaStore((state) => state.playlists);
  const selectedPlaylistId = useAdminMediaStore((state) => state.selectedPlaylistId);
  const deleteMedia = useAdminMediaStore((state) => state.deleteMedia);
  const addMediaToPlaylist = useAdminMediaStore((state) => state.addMediaToPlaylist);
  const removeMediaFromPlaylist = useAdminMediaStore((state) => state.removeMediaFromPlaylist);
  const [search, setSearch] = useState("");
  const [previewMedia, setPreviewMedia] = useState<Media | null>(null);

  const selectedPlaylist = playlists.find((playlist) => playlist.id === selectedPlaylistId);

  const filteredMedias = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return medias;

    return medias.filter(
      (media) =>
        media.name.toLowerCase().includes(term) ||
        media.description.toLowerCase().includes(term) ||
        media.type.toLowerCase().includes(term),
    );
  }, [medias, search]);

  async function handleDelete(mediaId: string) {
    try {
      await deleteMedia(mediaId);
      message.success("Mídia excluída com sucesso.");
    } catch {
      message.error("Não foi possível excluir a mídia.");
    }
  }

  async function handleTogglePlaylist(mediaId: string) {
    if (!selectedPlaylistId) return;

    const isOnPlaylist = selectedPlaylist?.mediaIds.includes(mediaId);

    try {
      if (isOnPlaylist) {
        await removeMediaFromPlaylist(selectedPlaylistId, mediaId);
      } else {
        await addMediaToPlaylist(selectedPlaylistId, mediaId);
      }
    } catch {
      message.error("Não foi possível atualizar a playlist.");
    }
  }

  const columns: ColumnsType<Media> = [
    {
      title: "Mídia",
      key: "name",
      render: (_, media) => (
        <Flex gap={12} align="center">
          <MediaThumbnail media={media} />
          <div>
            <Text strong>{media.name}</Text>
            <br />
            <Text type="secondary">{media.description || "Sem descrição"}</Text>
          </div>
        </Flex>
      ),
    },
    {
      title: "Tipo",
      dataIndex: "type",
      key: "type",
      width: 110,
      render: (type: MediaType) => (
        <Tag icon={getMediaTypeIcon(type)}>{getMediaTypeLabel(type)}</Tag>
      ),
    },
    {
      title: "Criado em",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 120,
    },
    {
      title: "Ações",
      key: "actions",
      width: 360,
      render: (_, media) => (
        <MediaActions
          media={media}
          selectedPlaylist={selectedPlaylist}
          onPreview={setPreviewMedia}
          onEdit={onEditMedia}
          onDelete={handleDelete}
          onTogglePlaylist={handleTogglePlaylist}
        />
      ),
    },
  ];

  return (
    <Card
      title="Mídias cadastradas"
      extra={
        <Input.Search
          allowClear
          placeholder="Buscar mídia..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full sm:w-64"
        />
      }
    >
      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredMedias}
        pagination={{ pageSize: 5 }}
        scroll={{ x: 800 }}
        locale={{ emptyText: <Empty description="Nenhuma mídia encontrada" /> }}
      />

      <MediaPreviewModal media={previewMedia} onClose={() => setPreviewMedia(null)} />
    </Card>
  );
}

export { MediaTable };
