// src/types/queue.ts
export type QueueTicketType = 'N' | 'P';

export interface QueueTicket {
  id: number;
  numero: string;
  tipo: TipoSenha;
  status: StatusSenha;
  guiche: number;
  horario: Date;
  dataCriacao: Date;
  serviceType?: {
    id: number;
    name: string;
  };
  calledAt?: string | null;
  counter?: {
    id: number;
    name: string;
  } | null;
}

export interface QueueDisplay {
  atual: QueueTicket | null;
  espera: QueueTicket[];
  ultimasChamadas: QueueTicket[];
}

export const TipoSenha = {
  ATENDIMENTO_ORCAMENTO: 'AO',
  PREFERENCIAL: 'P',
  VACINA: 'V',
  AGENDAR_EXAMES: 'AE',
  RETIRAR_RESULTADOS: 'RR',
  EXAMES_AGENDADOS: 'EA'
} as const;

export type TipoSenha = typeof TipoSenha[keyof typeof TipoSenha];

export const StatusSenha = {
  AGUARDANDO: 'AGUARDANDO',
  CHAMANDO: 'CHAMANDO',
  EM_ATENDIMENTO: 'EM_ATENDIMENTO',
  FINALIZADO: 'FINALIZADO'
} as const;

export type StatusSenha = typeof StatusSenha[keyof typeof StatusSenha];