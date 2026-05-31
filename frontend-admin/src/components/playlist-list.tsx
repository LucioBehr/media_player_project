import { App, Badge, Button, Card, Empty, List, Popconfirm, Space, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { Playlist } from "../types/playlist";
import { useAdminMediaStore } from "../store/admin-media-store";

type PlaylistListProps = {
  onEditPlaylist: (playlist: Playlist) => void;
};

function PlaylistList({ onEditPlaylist }: PlaylistListProps) {
  const { message } = App.useApp();
  const playlists = useAdminMediaStore((state) => state.playlists);
  const selectedPlaylistId = useAdminMediaStore((state) => state.selectedPlaylistId);
  const selectPlaylist = useAdminMediaStore((state) => state.selectPlaylist);
  const deletePlaylist = useAdminMediaStore((state) => state.deletePlaylist);

  async function handleDelete(playlistId: string) {
    try {
      await deletePlaylist(playlistId);
      message.success("Playlist excluída com sucesso.");
    } catch {
      message.error("Não foi possível excluir a playlist.");
    }
  }

  if (!playlists.length) {
    return (
      <Card title="Playlists">
        <Empty description="Nenhuma playlist cadastrada" />
      </Card>
    );
  }

  return (
    <Card title="Playlists">
      <List
        dataSource={playlists}
        renderItem={(playlist) => {
          const isSelected = selectedPlaylistId === playlist.id;

          return (
            <List.Item
              onClick={() => selectPlaylist(playlist.id)}
              className={`cursor-pointer rounded px-2 ${isSelected ? "bg-blue-50" : ""}`}
              actions={[
                <Button
                  key="edit"
                  size="small"
                  icon={<EditOutlined />}
                  onClick={(event) => {
                    event.stopPropagation();
                    onEditPlaylist(playlist);
                  }}
                >
                  Editar
                </Button>,
                <Popconfirm
                  key="delete"
                  title="Excluir playlist?"
                  okText="Excluir"
                  cancelText="Cancelar"
                  okButtonProps={{ danger: true }}
                  onConfirm={() => handleDelete(playlist.id)}
                >
                  <Button
                    size="small"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={(event) => event.stopPropagation()}
                  />
                </Popconfirm>,
              ]}
            >
              <List.Item.Meta
                title={playlist.name}
                description={
                  <Space direction="vertical" size={4}>
                    <span>{playlist.description || "Sem descrição"}</span>
                    <Space>
                      <Badge
                        status={playlist.showOnPlayer ? "success" : "default"}
                        text={playlist.showOnPlayer ? "Ativa no player" : "Oculta no player"}
                      />
                      <Tag>{playlist.mediaIds.length} mídia(s)</Tag>
                    </Space>
                  </Space>
                }
              />
            </List.Item>
          );
        }}
      />
    </Card>
  );
}

export { PlaylistList };
