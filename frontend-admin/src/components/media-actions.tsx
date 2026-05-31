import type {Playlist} from "../types/playlist";
import type {Media} from "../types/media";
import {
    Button,
    Flex,
    Popconfirm
  } from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined
  } from "@ant-design/icons";

type MediaActionsProps = {
    media: Media;
    selectedPlaylist?: Playlist;
    onPreview: (media: Media) => void;
    onEdit: (media: Media) => void;
    onDelete: (mediaId: string) => void;
    onTogglePlaylist: (mediaId: string) => void;
  };
  
  function MediaActions({ media, selectedPlaylist, onPreview, onEdit, onDelete, onTogglePlaylist }: MediaActionsProps) {
    const isOnSelectedPlaylist = Boolean(selectedPlaylist?.mediaIds.includes(media.id));
  
    return (
      <Flex gap={8} wrap="wrap">
        <Button icon={<EyeOutlined />} onClick={() => onPreview(media)}>
          Ver
        </Button>
        <Button icon={<EditOutlined />} onClick={() => onEdit(media)}>
          Editar
        </Button>
        <Button disabled={!selectedPlaylist} type={isOnSelectedPlaylist ? "primary" : "default"} onClick={() => onTogglePlaylist(media.id)}>
          {isOnSelectedPlaylist ? "Remover da playlist" : "Adicionar à playlist"}
        </Button>
        <Popconfirm
          title="Excluir mídia"
          description="Essa mídia também será removida das playlists. Deseja continuar?"
          okText="Excluir"
          cancelText="Cancelar"
          okButtonProps={{ danger: true }}
          onConfirm={() => onDelete(media.id)}
        >
          <Button danger icon={<DeleteOutlined />} />
        </Popconfirm>
      </Flex>
    );
  }

export {MediaActions};