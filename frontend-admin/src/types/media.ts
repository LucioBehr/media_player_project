type MediaType = "image" | "video";

type Media = {
  id: string;
  name: string;
  description: string;
  type: MediaType;
  url: string;
  createdAt: string;
};

type MediaFormValues = {
  name: string;
  description?: string;
  type: MediaType;
  url?: string;
  file?: File;
};

type CreateMediaRequest = {
  name: string;
  description?: string;
  type: MediaType;
  url?: string;
};

type UpdateMediaRequest = {
  name: string;
  description?: string;
  type: MediaType;
  url?: string;
};

type MediaResponse = {
  id: string;
  name: string;
  description: string;
  type: MediaType;
  url: string;
  createdAt: string;
};

export type { MediaType, Media, MediaFormValues, CreateMediaRequest, UpdateMediaRequest, MediaResponse };
