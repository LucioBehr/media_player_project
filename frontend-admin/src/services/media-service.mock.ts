import type {
  CreateMediaRequest,
  MediaResponse,
  UpdateMediaRequest,
} from "../types/media";
import { parseMediaFormData } from "../utils/form-data";
import { mapMediaToResponse } from "./mappers";
import { getMedias, setMedias, getPlaylists, setPlaylists } from "./mock-store";

function resolveMediaUrl(payload: { url?: string; file?: File }): string {
  if (payload.url) return payload.url;
  if (payload.file) return URL.createObjectURL(payload.file);
  return "";
}

function parseCreatePayload(payload: CreateMediaRequest | FormData): {
  name: string;
  description?: string;
  type: CreateMediaRequest["type"];
  url?: string;
  file?: File;
} {
  if (payload instanceof FormData) {
    return parseMediaFormData(payload);
  }

  return payload;
}

function parseUpdatePayload(payload: UpdateMediaRequest | FormData): {
  name: string;
  description?: string;
  type: UpdateMediaRequest["type"];
  url?: string;
  file?: File;
} {
  if (payload instanceof FormData) {
    return parseMediaFormData(payload);
  }

  return payload;
}

const MediaServiceMock = {
  async getMedias(): Promise<MediaResponse[]> {
    return Promise.resolve(getMedias().map(mapMediaToResponse));
  },

  async createMedia(payload: CreateMediaRequest | FormData): Promise<MediaResponse> {
    const data = parseCreatePayload(payload);
    const newMedia = {
      id: crypto.randomUUID(),
      name: data.name,
      description: data.description ?? "",
      type: data.type,
      url: resolveMediaUrl(data),
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setMedias([newMedia, ...getMedias()]);

    return Promise.resolve(mapMediaToResponse(newMedia));
  },

  async updateMedia(id: string, payload: UpdateMediaRequest | FormData): Promise<MediaResponse> {
    const data = parseUpdatePayload(payload);
    const existing = getMedias().find((media) => media.id === id);

    if (!existing) {
      return Promise.reject(new Error("Mídia não encontrada."));
    }

    const updatedMedia = {
      ...existing,
      name: data.name,
      description: data.description ?? "",
      type: data.type,
      url: data.file ? resolveMediaUrl(data) : data.url ?? existing.url,
    };

    setMedias(getMedias().map((media) => (media.id === id ? updatedMedia : media)));

    return Promise.resolve(mapMediaToResponse(updatedMedia));
  },

  async deleteMedia(id: string): Promise<void> {
    setMedias(getMedias().filter((media) => media.id !== id));
    setPlaylists(
      getPlaylists().map((playlist) => ({
        ...playlist,
        mediaIds: playlist.mediaIds.filter((mediaId) => mediaId !== id),
      })),
    );

    return Promise.resolve();
  },
};

export { MediaServiceMock };
