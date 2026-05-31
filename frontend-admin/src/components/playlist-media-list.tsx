import { useMemo } from "react";
import { Button, Card, Empty, Flex, List, Tag, Typography } from "antd";
import { useAdminMediaStore } from "../store/admin-media-store";
import { getMediaTypeLabel, getMediaTypeIcon } from "../utils/media";
import { MediaThumbnail } from "./media-thumbnail";

const { Text } = Typography;

function PlaylistMediaList() {
  const medias = useAdminMediaStore((state) => state.medias);
  const playlists = useAdminMediaStore((state) => state.playlists);
  const selectedPlaylistId = useAdminMediaStore((state) => state.selectedPlaylistId);
  const removeMediaFromPlaylist = useAdminMediaStore((state) => state.removeMediaFromPlaylist);

  const selectedPlaylist = playlists.find((playlist) => playlist.id === selectedPlaylistId);

  const playlistMedias = useMemo(() => {
    if (!selectedPlaylist) return [];
    return medias.filter((media) => selectedPlaylist.mediaIds.includes(media.id));
  }, [medias, selectedPlaylist]);

  return (
    <Card title="Mídias da playlist">
      <Text type="secondary" className="mb-4 block">
        {selectedPlaylist ? selectedPlaylist.name : "Nenhuma playlist selecionada"}
      </Text>

      {!playlistMedias.length ? (
        <Empty description="Essa playlist ainda não possui mídias" />
      ) : (
        <List
          dataSource={playlistMedias}
          renderItem={(media) => (
            <List.Item
              actions={[
                <Button
                  key="remove"
                  danger
                  size="small"
                  onClick={() => {
                    if (!selectedPlaylistId) return;
                    void removeMediaFromPlaylist(selectedPlaylistId, media.id);
                  }}
                >
                  Remover
                </Button>,
              ]}
            >
              <Flex gap={12} align="center" className="w-full">
                <MediaThumbnail media={media} size="sm" />
                <div>
                  <Text strong>{media.name}</Text>
                  <br />
                  <Tag icon={getMediaTypeIcon(media.type)}>{getMediaTypeLabel(media.type)}</Tag>
                </div>
              </Flex>
            </List.Item>
          )}
        />
      )}
    </Card>
  );
}

export { PlaylistMediaList };
