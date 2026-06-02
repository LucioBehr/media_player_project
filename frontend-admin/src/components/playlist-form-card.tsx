import { App, Button, Card, Flex, Form, Input, Switch } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import type { Playlist, PlaylistFormValues } from "../types/playlist";
import { useAdminMediaStore } from "../store/admin-media-store";
import { useEffect } from "react";

type PlaylistFormCardProps = {
  editingPlaylist: Playlist | null;
  onCancelEdit: () => void;
  onFinish: () => void;
};

function PlaylistFormCard({ editingPlaylist, onCancelEdit, onFinish }: PlaylistFormCardProps) {
  const [form] = Form.useForm<PlaylistFormValues>();
  useEffect(() => {
    if (editingPlaylist) {
      form.setFieldsValue({
        name: editingPlaylist.name,
        description: editingPlaylist.description,
        showOnPlayer: editingPlaylist.showOnPlayer,
      });
    } else {
      form.resetFields();
    }
  }, [editingPlaylist, form]);
  const { message } = App.useApp();
  const createPlaylist = useAdminMediaStore((state) => state.createPlaylist);
  const updatePlaylist = useAdminMediaStore((state) => state.updatePlaylist);

  async function handleSubmit(values: PlaylistFormValues) {
    try {
      if (editingPlaylist) {
        await updatePlaylist(editingPlaylist.id, values);
        message.success("Playlist atualizada com sucesso.");
      } else {
        await createPlaylist(values);
        message.success("Playlist criada com sucesso.");
      }

      form.resetFields();
      onFinish();
    } catch {
      message.error("Não foi possível salvar a playlist.");
    }
  }

  return (
    <Card title={editingPlaylist ? "Editar playlist" : "Criar playlist"}>
      <Form
        form={form}
        layout="vertical"
        //initialValues={{
        //   name: editingPlaylist?.name ?? "",
        //   description: editingPlaylist?.description ?? "",
        //   showOnPlayer: editingPlaylist?.showOnPlayer ?? false,
        // }}
        onFinish={handleSubmit}
        // key={editingPlaylist?.id ?? "create-playlist"}
      >
        <Form.Item label="Nome" name="name" rules={[{ required: true, message: "Informe o nome." }]}>
          <Input placeholder="Ex: Recepção" />
        </Form.Item>

        <Form.Item label="Descrição" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item label="Exibir no player" name="showOnPlayer" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Flex justify="end" gap={8}>
          {editingPlaylist && <Button onClick={onCancelEdit}>Cancelar</Button>}
          <Button type="primary" htmlType="submit" icon={editingPlaylist ? <EditOutlined /> : <PlusOutlined />}>
            {editingPlaylist ? "Salvar" : "Criar"}
          </Button>
        </Flex>
      </Form>
    </Card>
  );
}

export { PlaylistFormCard };
