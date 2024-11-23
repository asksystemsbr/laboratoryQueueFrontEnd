// src/services/api.ts
import axios from 'axios'
import type { QueueTicket, QueueDisplay } from '@/types/queue'

const api = axios.create({
  baseURL: 'http://localhost:7035/api'
})

// Mock data para testes
const mockData: QueueDisplay = {
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
    { id: 4, numero: 'A125', tipo: 'N', status: 'ESPERA' }
  ],
  ultimasChamadas: [
    { id: 0, numero: 'A122', tipo: 'N', guiche: 1, status: 'FINALIZADA' },
    { id: -1, numero: 'P051', tipo: 'P', guiche: 2, status: 'FINALIZADA' },
    { id: -2, numero: 'A121', tipo: 'N', guiche: 3, status: 'FINALIZADA' }
  ]
}

// Variável para controlar ambiente de teste
const isTestMode = true // Altere para false quando a API estiver pronta

export const queueService = {
  async gerarSenha(tipo: 'N' | 'P'): Promise<QueueTicket> {
    if (isTestMode) {
      const novoNumero = tipo === 'N' 
        ? `A${Math.floor(Math.random() * 1000)}`
        : `P${Math.floor(Math.random() * 1000)}`
      
      const novaSenha = {
        id: Math.floor(Math.random() * 10000),
        numero: novoNumero,
        tipo,
        status: 'ESPERA'
      }

      mockData.espera.push(novaSenha)
      return novaSenha
    }

    const { data } = await api.post<QueueTicket>('/Queue/generate', { tipo })
    return data
  },

  async obterPainel(): Promise<QueueDisplay> {
    if (isTestMode) {
      return mockData
    }

    const { data } = await api.get<QueueDisplay>('/Queue/display')
    return data
  },

  async chamarProximo(guiche: number): Promise<QueueTicket | null> {
    if (isTestMode) {
      if (mockData.espera.length === 0) return null

      const proximaSenha = mockData.espera.shift()
      if (!proximaSenha) return null

      const senhaAtualizada = {
        ...proximaSenha,
        guiche,
        status: 'CHAMADA'
      }

      if (mockData.atual) {
        mockData.ultimasChamadas.unshift({
          ...mockData.atual,
          status: 'FINALIZADA'
        })
        if (mockData.ultimasChamadas.length > 5) {
          mockData.ultimasChamadas.pop()
        }
      }

      mockData.atual = senhaAtualizada
      return senhaAtualizada
    }

    const { data } = await api.post<QueueTicket>('/Queue/call', { guiche })
    return data
  }
}