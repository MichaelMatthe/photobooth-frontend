import axios from "axios";

export const BASE_URL = "http://127.0.0.1:8000"

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export interface Photo {
  id: string;
  filename: string;
  created_at: string;
}

// POST /photos
export async function capturePhoto(): Promise<Photo> {
  const res = await api.post<Photo>("/photos");
  return res.data;
}

// GET /photos
export async function getAllPhotos(): Promise<Photo[]> {
  const res = await api.get<Photo[]>("/photos");
  return res.data;
}

export async function getPhotos(offset = 0, limit = 20): Promise<Photo[]> {
  const res = await api.get<Photo[]>(`/photos?offset=${offset}&limit=${limit}`);
  return res.data;
}

// POST /photos/{id}/print
export async function printPhoto(photoId: string): Promise<void> {
  await api.post(`/photos/${photoId}/print`);
}
