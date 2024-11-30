import axios from 'axios'
import type { QueueTicket, QueueDisplay, TipoSenha } from '@/types/queue'

const api = axios.create({
  baseURL: 'http://localhost:7035/api'
})

export const queueService = {
  async gerarSenha(tipo: TipoSenha): Promise<QueueTicket> {
    debugger
    const { data } = await api.post<QueueTicket>('/Queue/generate', { serviceTypeCode: tipo });
    return data;
  },

  async obterPainel(): Promise<QueueDisplay> {
    const { data } = await api.get<QueueDisplay>('/Queue/display')
    return data
  },

  async chamarProximo(guiche: number): Promise<QueueTicket | null> {
    const { data } = await api.post<QueueTicket>('/Queue/call', { guiche })
    return data
  },

  async finalizarAtendimento(senhaId: number): Promise<void> {
    await api.post(`/Queue/finish/${senhaId}`)
  },

  async rechamarSenha(senhaId: number): Promise<void> {
    await api.post(`/Queue/recall/${senhaId}`)
  },

  async obterHistorico(): Promise<QueueTicket[]> {
    const { data } = await api.get<QueueTicket[]>('/Queue/history')
    return data
  },

  async salvarConfiguracoesGuiche(guiche: number, config: any): Promise<void> {
    await api.post(`/Queue/counter/${guiche}/config`, config)
  }
}