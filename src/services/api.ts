import axios from 'axios';
import type { QueueTicket, QueueDisplay } from '../types/queue';

const api = axios.create({
  baseURL: 'http://localhost:7035/api'
});

class QueueService {
  async gerarSenha(tipo: string) {
    const { data } = await api.post<QueueTicket>('/Queue/generate', { tipo });
    return data;
  }

  async chamarProxima(guiche: number) {
    const { data } = await api.post<QueueTicket>('/Queue/call', { guiche });
    return data;
  }

  async obterPainel() {
    const { data } = await api.get<QueueDisplay>('/Queue/display');
    return data;
  }
}

export const queueService = new QueueService();