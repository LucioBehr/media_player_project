import type { Media, MediaResponse } from "../types/media";

function mapMediaResponseToMedia(response: MediaResponse): Media {
  return {
    id: response.id,
    name: response.name,
    description: response.description,
    type: response.type,
    url: response.url,
    createdAt: response.createdAt,
  };
}

export { mapMediaResponseToMedia };
