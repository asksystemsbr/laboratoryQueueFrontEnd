export interface QueueTicket {
    id: number;
    tipo: string;
    numero: string;
    guiche?: number;
    status: string;
    dataCriacao: Date;
  }
  
  export interface QueueDisplay {
    atual: QueueTicket | null;
    espera: QueueTicket[];
    ultimasChamadas: QueueTicket[];
  }