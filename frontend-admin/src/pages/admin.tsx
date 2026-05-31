import { useEffect, useState } from "react";
import { App, ConfigProvider, Layout } from "antd";
import type { Media } from "../types/media";
import type { Playlist } from "../types/playlist";
import { antdTheme } from "../styles/antd-theme";
import { useAdminMediaStore } from "../store/admin-media-store";
import { AdminHeader } from "../components/admin-header";
import { MediaFormCard } from "../components/media-form-card";
import { MediaTable } from "../components/media-table";
import { PlaylistFormCard } from "../components/playlist-form-card";
import { PlaylistList } from "../components/playlist-list";
import { PlaylistMediaList } from "../components/playlist-media-list";

const { Content } = Layout;

function AdminMediaContent() {
  const [editingMedia, setEditingMedia] = useState<Media | null>(null);
  const [editingPlaylist, setEditingPlaylist] = useState<Playlist | null>(null);
  const loadMedias = useAdminMediaStore((state) => state.loadMedias);
  const loadPlaylists = useAdminMediaStore((state) => state.loadPlaylists);

  useEffect(() => {
    void loadMedias();
    void loadPlaylists();
  }, [loadMedias, loadPlaylists]);

  return (
    <Content className="bg-gray-50 p-4 md:p-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row">
        <div className="flex flex-1 flex-col gap-4">
          <MediaFormCard
            editingMedia={editingMedia}
            onCancelEdit={() => setEditingMedia(null)}
            onFinish={() => setEditingMedia(null)}
          />
          <MediaTable onEditMedia={setEditingMedia} />
        </div>

        <aside className="flex w-full flex-col gap-4 lg:w-96">
          <PlaylistFormCard
            editingPlaylist={editingPlaylist}
            onCancelEdit={() => setEditingPlaylist(null)}
            onFinish={() => setEditingPlaylist(null)}
          />
          <PlaylistList onEditPlaylist={setEditingPlaylist} />
          <PlaylistMediaList />
        </aside>
      </div>
    </Content>
  );
}

export default function AdminMediaPage() {
  return (
    <ConfigProvider theme={antdTheme}>
      <App>
        <Layout className="min-h-screen">
          <AdminHeader />
          <AdminMediaContent />
        </Layout>
      </App>
    </ConfigProvider>
  );
}
