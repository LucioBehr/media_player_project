import {
  App,
  Button,
  Card,
  Flex,
  Form,
  Input,
  Typography,
  Upload,
} from "antd";
import { EditOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import type { Media, MediaFormValues } from "../types/media";
import { useAdminMediaStore } from "../store/admin-media-store";
import { useEffect } from "react";

const { Text } = Typography;

type MediaFormCardProps = {
  editingMedia: Media | null;
  onCancelEdit: () => void;
  onFinish: () => void;
};

function MediaFormCard({ editingMedia, onCancelEdit, onFinish }: MediaFormCardProps) {
  const [form] = Form.useForm<MediaFormValues>();
  const { message } = App.useApp();
  const createMedia = useAdminMediaStore((state) => state.createMedia);
  const updateMedia = useAdminMediaStore((state) => state.updateMedia);

  useEffect(() => {
    if (editingMedia) {
      form.setFieldsValue({
        name: editingMedia.name,
        description: editingMedia.description,
      });
    } else {
      form.resetFields();
    }
  }, [editingMedia, form]);

  async function handleSubmit(values: MediaFormValues) {
    const payload: MediaFormValues = {
      name: values.name,
      description: values.description,
      file: values.file,
    };

    try {
      if (editingMedia) {
        await updateMedia(editingMedia.id, payload);
        message.success("Mídia atualizada com sucesso.");
      } else {
        await createMedia(payload);
        message.success("Mídia cadastrada com sucesso.");
      }

      form.resetFields();
      onFinish();
    } catch {
      message.error("Não foi possível salvar a mídia.");
    }
  }

  return (
    <Card
      title={editingMedia ? "Editar mídia" : "Cadastrar mídia"}
      extra={editingMedia ? <Button onClick={onCancelEdit}>Cancelar</Button> : null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item label="Nome" name="name" rules={[{ required: true, message: "Informe o nome." }]}>
          <Input placeholder="Ex: Banner principal" />
        </Form.Item>

        <Form.Item label="Descrição" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>

        {editingMedia && (
          <Form.Item label="Arquivo atual">
            <Text type="secondary">{editingMedia.name}</Text>
          </Form.Item>
        )}

        <Form.Item
          label={editingMedia ? "Substituir arquivo (opcional)" : "Arquivo"}
          name="file"
          getValueFromEvent={(info) => info.fileList[0]?.originFileObj as File | undefined}
          rules={[
            {
              validator: (_, value) => {
                if (editingMedia || value instanceof File) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Selecione um arquivo."));
              },
            },
          ]}
        >
          <Upload maxCount={1} accept="image/*,video/*" beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Selecionar imagem ou vídeo</Button>
          </Upload>
        </Form.Item>

        <Flex justify="end" gap={8}>
          {editingMedia && <Button onClick={onCancelEdit}>Cancelar</Button>}
          <Button type="primary" htmlType="submit" icon={editingMedia ? <EditOutlined /> : <PlusOutlined />}>
            {editingMedia ? "Salvar" : "Cadastrar"}
          </Button>
        </Flex>
      </Form>
    </Card>
  );
}

export { MediaFormCard };