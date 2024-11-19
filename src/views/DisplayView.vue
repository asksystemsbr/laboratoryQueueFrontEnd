<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { queueService } from '@/services/api';
import type { QueueTicket } from '@/types/queue';

const senhaAtual = ref<QueueTicket | null>(null);
const senhasEspera = ref<QueueTicket[]>([]);
const ultimasChamadas = ref<QueueTicket[]>([]);

const atualizarPainel = async () => {
  try {
    const dados = await queueService.obterPainel();
    senhaAtual.value = dados.atual;
    senhasEspera.value = dados.espera;
    ultimasChamadas.value = dados.ultimasChamadas;
  } catch (error) {
    console.error('Erro ao atualizar painel:', error);
  }
};

let intervalo: number;

onMounted(() => {
  atualizarPainel();
  intervalo = setInterval(atualizarPainel, 5000);
});

onUnmounted(() => {
  if (intervalo) clearInterval(intervalo);
});
</script>