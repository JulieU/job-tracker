export interface Card {
  id: number;
  title: string;
  company: string;
  location?: string;
  salary?: string;
  url?: string;
  notes?: string;
  logoUrl?: string;
  order: number;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  id: number;
  title: string;
  order: number;
  boardId: number;
  cards: Card[];
  createdAt: string;
  updatedAt: string;
}

export interface Board {
  id: number;
  title: string;
  columns: Column[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateCardInput {
  title: string;
  company: string;
  location?: string;
  salary?: string;
  url?: string;
  notes?: string;
  order: number;
}

export interface UpdateCardInput {
  title?: string;
  company?: string;
  location?: string;
  salary?: string;
  url?: string;
  notes?: string;
  columnId?: number;
  order?: number;
}
