<script setup lang="ts">
import { ref } from 'vue';
import { queueService } from '@/services/api';
import type { QueueTicket } from '@/types/queue';

const numeroGuiche = ref(1);
const senhaAtual = ref<QueueTicket | null>(null);
const loading = ref(false);

const chamarProxima = async () => {
  try {
    loading.value = true;
    senhaAtual.value = await queueService.chamarProxima(numeroGuiche.value);
  } catch (error) {
    console.error('Erro ao chamar próxima senha:', error);
  } finally {
    loading.value = false;
  }
};
</script>