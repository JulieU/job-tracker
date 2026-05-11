export interface CreateBoardInput {
  title: string;
}

export interface CreateColumnInput {
  title: string;
  order: number;
}

export interface CreateCardInput {
  title: string;
  company: string;
  location?: string;
  salary?: string;
  url?: string;
  notes?: string;
  logoUrl?: string;
  order: number;
}

export interface UpdateCardInput {
  title?: string;
  company?: string;
  location?: string;
  salary?: string;
  url?: string;
  notes?: string;
  logoUrl?: string;
  order?: number;
  columnId?: number;
}
