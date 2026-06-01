type MediaType = "image" | "video";

type Media = {
  id: string;
  name: string;
  description: string;
  type: MediaType;
  url: string;
  createdAt: string;
};

type MediaResponse = {
  id: string;
  name: string;
  description: string;
  type: MediaType;
  url: string;
  createdAt: string;
};

export type { MediaType, Media, MediaResponse };
