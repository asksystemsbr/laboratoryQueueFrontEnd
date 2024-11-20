// src/types/queue.ts
export type QueueTicketType = 'N' | 'P';

export interface QueueTicket {
  id: number;
  numero: string;
  tipo: QueueTicketType;
  guiche?: number;
  status: string;
  dataCriacao?: Date;
}

export interface QueueDisplay {
  atual: QueueTicket | null;
  espera: QueueTicket[];
  ultimasChamadas: QueueTicket[];
}