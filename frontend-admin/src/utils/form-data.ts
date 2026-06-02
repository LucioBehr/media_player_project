import type { MediaFormValues } from "../types/media";

function buildCreateMediaFormData(values: MediaFormValues): FormData {
  const formData = new FormData();
  formData.append("name", values.name);

  if (values.description) {
    formData.append("description", values.description);
  }

  if (values.file) {
    formData.append("file", values.file);
  }

  return formData;
}

function buildUpdateMediaFormData(values: MediaFormValues): FormData {
  return buildCreateMediaFormData(values);
}

function parseMediaFormData(formData: FormData): {
  name: string;
  description?: string;
  file?: File;
} {
  const name = formData.get("name");
  const description = formData.get("description");
  const file = formData.get("file");

  return {
    name: String(name ?? ""),
    description: description ? String(description) : undefined,
    file: file instanceof File ? file : undefined,
  };
}

export { buildCreateMediaFormData, buildUpdateMediaFormData, parseMediaFormData };