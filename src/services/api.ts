// src/services/api.ts
import axios from 'axios'
import type { QueueTicket, QueueDisplay } from '@/types/queue'

const api = axios.create({
  baseURL: 'http://localhost:7035/api'
})

export const queueService = {
  async gerarSenha(tipo: 'N' | 'P'): Promise<QueueTicket> {
    const { data } = await api.post<QueueTicket>('/Queue/generate', { tipo })
    return data
  },

  async obterPainel(): Promise<QueueDisplay> {
    const { data } = await api.get<QueueDisplay>('/Queue/display')
    return data
  },

  async chamarProximo(guiche: number): Promise<QueueTicket | null> {
    const { data } = await api.post<QueueTicket>('/Queue/call', { guiche })
    return data
  }
}