import type { MediaFormValues, MediaType } from "../types/media";

function buildCreateMediaFormData(values: MediaFormValues): FormData {
  const formData = new FormData();
  formData.append("name", values.name);
  formData.append("type", values.type);

  if (values.description) {
    formData.append("description", values.description);
  }

  if (values.file) {
    formData.append("file", values.file);
  } else if (values.url) {
    formData.append("url", values.url);
  }

  return formData;
}

function buildUpdateMediaFormData(values: MediaFormValues): FormData {
  return buildCreateMediaFormData(values);
}

function parseMediaFormData(formData: FormData): {
  name: string;
  description?: string;
  type: MediaType;
  url?: string;
  file?: File;
} {
  const name = formData.get("name");
  const type = formData.get("type");
  const description = formData.get("description");
  const url = formData.get("url");
  const file = formData.get("file");

  return {
    name: String(name ?? ""),
    description: description ? String(description) : undefined,
    type: (type ?? "image") as MediaType,
    url: url ? String(url) : undefined,
    file: file instanceof File ? file : undefined,
  };
}

export { buildCreateMediaFormData, buildUpdateMediaFormData, parseMediaFormData };
