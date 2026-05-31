import { API_ENDPOINTS } from "../config/api";
import type {
  CreateMediaRequest,
  MediaResponse,
  UpdateMediaRequest,
} from "../types/media";
import { apiDelete, apiGet, apiPost, apiPostFormData, apiPut, apiPutFormData } from "./http-client";

const MediaServiceApi = {
  async getMedias(): Promise<MediaResponse[]> {
    return apiGet<MediaResponse[]>(API_ENDPOINTS.medias);
  },

  async createMedia(payload: CreateMediaRequest | FormData): Promise<MediaResponse> {
    if (payload instanceof FormData) {
      return apiPostFormData<MediaResponse>(API_ENDPOINTS.medias, payload);
    }

    return apiPost<MediaResponse>(API_ENDPOINTS.medias, payload);
  },

  async updateMedia(id: string, payload: UpdateMediaRequest | FormData): Promise<MediaResponse> {
    if (payload instanceof FormData) {
      return apiPutFormData<MediaResponse>(API_ENDPOINTS.media(id), payload);
    }

    return apiPut<MediaResponse>(API_ENDPOINTS.media(id), payload);
  },

  async deleteMedia(id: string): Promise<void> {
    return apiDelete(API_ENDPOINTS.media(id));
  },
};

export { MediaServiceApi };
