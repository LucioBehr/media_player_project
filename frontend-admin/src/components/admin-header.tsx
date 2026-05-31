import { Layout, Typography } from "antd";

const { Header } = Layout;
const { Title } = Typography;

function AdminHeader() {
  return (
    <Header className="border-b border-gray-200 bg-white px-6">
      <Title level={3} className="!mb-0 !leading-[64px]">
        Administração de Mídias e Playlists
      </Title>
    </Header>
  );
}

export { AdminHeader };
