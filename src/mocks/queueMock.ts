// src/mocks/queueMock.ts
import type { QueueTicket, QueueDisplay } from '@/types/queue'

export const mockData: QueueDisplay = {
  atual: {
    id: 1,
    numero: 'A123',
    tipo: 'N',
    guiche: 3,
    status: 'CHAMADA'
  },
  espera: [
    { id: 2, numero: 'A124', tipo: 'N', status: 'ESPERA' },
    { id: 3, numero: 'P052', tipo: 'P', status: 'ESPERA' },
    { id: 4, numero: 'A125', tipo: 'N', status: 'ESPERA' },
    { id: 5, numero: 'A126', tipo: 'N', status: 'ESPERA' },
    { id: 6, numero: 'P053', tipo: 'P', status: 'ESPERA' }
  ],
  ultimasChamadas: [
    { id: 0, numero: 'A122', tipo: 'N', guiche: 1, status: 'FINALIZADA' },
    { id: -1, numero: 'P051', tipo: 'P', guiche: 2, status: 'FINALIZADA' },
    { id: -2, numero: 'A121', tipo: 'N', guiche: 3, status: 'FINALIZADA' }
  ]
}