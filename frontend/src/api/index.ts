import axios from "axios";
import type { Board, CreateCardInput, UpdateCardInput } from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export const getBoards = async (): Promise<Board[]> => {
  const { data } = await api.get("/boards");
  return data;
};

export const createBoard = async (title: string): Promise<Board> => {
  const { data } = await api.post("/boards", { title });
  return data;
};

export const deleteBoard = async (id: number): Promise<void> => {
  await api.delete(`/boards/${id}`);
};

export const createCard = async (
  columnId: number,
  card: CreateCardInput,
): Promise<void> => {
  await api.post(`/columns/${columnId}/cards`, card);
};

export const updateCard = async (
  id: number,
  card: UpdateCardInput,
): Promise<void> => {
  await api.patch(`/cards/${id}`, card);
};

export const deleteCard = async (id: number): Promise<void> => {
  await api.delete(`/cards/${id}`);
};

export const fetchLogo = async (company: string): Promise<string | null> => {
  const { data } = await api.get(`/logo?company=${company}`);
  return data.logoUrl;
};
