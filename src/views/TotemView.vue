```vue
<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50">
    <div class="w-full max-w-5xl px-6 py-12">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Sistema de Senhas
        </h1>
        <p class="text-lg md:text-xl text-gray-600 font-medium">
          Selecione o tipo de atendimento desejado
        </p>
      </div>

      <!-- Cards Container -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 max-w-4xl mx-auto">
        <!-- Card Senha Normal -->
        <button
          @click="gerarSenha('N')"
          :disabled="loading"
          class="group flex flex-col items-center p-8 rounded-2xl bg-white border-2 border-transparent
                 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1
                 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:opacity-50"
        >
          <div class="mb-6 p-6 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
            <svg 
              class="w-20 h-20 text-blue-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
              />
            </svg>
          </div>
          
          <h2 class="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
            Senha Normal
          </h2>
          
          <p class="text-gray-600 text-center font-medium">
            Atendimento por ordem de chegada
          </p>

          <div class="mt-6 px-6 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
            Clique para gerar senha
          </div>
        </button>

        <!-- Card Senha Prioritária -->
        <button
          @click="gerarSenha('P')"
          :disabled="loading"
          class="group flex flex-col items-center p-8 rounded-2xl bg-white border-2 border-transparent
                 hover:border-green-500 transition-all duration-300 transform hover:-translate-y-1
                 focus:outline-none focus:ring-4 focus:ring-green-100 disabled:opacity-50"
        >
          <div class="mb-6 p-6 bg-green-50 rounded-full group-hover:bg-green-100 transition-colors">
            <svg 
              class="w-20 h-20 text-green-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
              />
            </svg>
          </div>
          
          <h2 class="text-2xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">
            Senha Prioritária
          </h2>
          
          <p class="text-gray-600 text-center font-medium">
            Atendimento preferencial
          </p>

          <div class="mt-6 px-6 py-2 bg-green-50 rounded-full text-green-700 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
            Clique para gerar senha
          </div>
        </button>
      </div>

      <!-- Feedback Message -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform -translate-y-4 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-4 opacity-0"
      >
        <div
          v-if="message"
          :class="[
            'fixed top-8 left-1/2 transform -translate-x-1/2 px-8 py-4 rounded-lg shadow-lg',
            'flex items-center space-x-3 z-50',
            message.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          ]"
        >
          <svg
            v-if="message.type === 'success'"
            class="w-6 h-6 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <svg
            v-else
            class="w-6 h-6 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <span class="font-medium">{{ message.text }}</span>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { queueService } from '@/services/api';

interface Message {
  text: string;
  type: 'success' | 'error';
}

const loading = ref(false);
const message = ref<Message | null>(null);

const showMessage = (text: string, type: 'success' | 'error') => {
  message.value = { text, type };
  setTimeout(() => {
    message.value = null;
  }, 3000);
};

const gerarSenha = async (tipo: string) => {
  if (loading.value) return;
  
  try {
    loading.value = true;
    const senhaGerada = await queueService.gerarSenha(tipo);
    const tipoSenha = tipo === 'N' ? 'normal' : 'prioritária';
    showMessage(`Senha ${senhaGerada.numero} (${tipoSenha}) gerada com sucesso!`, 'success');
  } catch (error) {
    showMessage('Não foi possível gerar a senha. Tente novamente.', 'error');
  } finally {
    loading.value = false;
  }
};
</script>
```