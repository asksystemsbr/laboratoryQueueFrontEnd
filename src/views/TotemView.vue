<template>
  <div class="toten-container bg-light min-vh-100">
    <!-- Cabeçalho -->
    <header class="text-center py-5">
      <h1 class="display-4 fw-bold">Sistema de Senhas</h1>
      <p class="lead">Selecione o tipo de atendimento desejado</p>
    </header>

    <!-- Opções de Senhas -->
    <div class="container">
      <div class="row g-4">
        <div 
          v-for="(botao, index) in configuracoes.botoes" 
          :key="index" 
          class="col-md-4"
        >
          <div class="card shadow-sm border-0">
            <div class="card-body text-center">
              <div 
                class="icon-wrapper mb-4"
                :style="{ backgroundColor: botao.color + '33' }"
              >
                <img 
                  :src="botao.icon" 
                  alt="Ícone" 
                  class="icon"
                />
              </div>
              <h5 class="card-title fw-bold">{{ botao.label }}</h5>
              <p class="text-muted small">{{ botao.description }}</p>
              <button 
                class="btn btn-primary w-100 fw-bold"
                :style="{ backgroundColor: botao.color }"
                @click="executarAcao(botao.action)"
              >
                Gerar Senha {{ botao.label }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Configurações dos botões do Totem
const configuracoes = ref({
  botoes: [
    {
      label: "Atendimento/Orçamento",
      description: "Atendimento relacionado a orçamentos.",
      color: "#FF5733",
      action: "orcamento",
      icon: "https://via.placeholder.com/50/FF5733/FFFFFF?text=$" // Ícone substituível
    },
    {
      label: "Preferencial",
      description: "Atendimento prioritário.",
      color: "#33FF57",
      action: "preferencial",
      icon: "https://via.placeholder.com/50/33FF57/FFFFFF?text=♥" // Ícone substituível
    },
    {
      label: "Vacina",
      description: "Agendamento e aplicação de vacinas.",
      color: "#FFC300",
      action: "vacina",
      icon: "https://via.placeholder.com/50/FFC300/FFFFFF?text=💉" // Ícone substituível
    },
    {
      label: "Agendar Exames",
      description: "Marcar exames laboratoriais.",
      color: "#28A745",
      action: "agendar_exames",
      icon: "https://via.placeholder.com/50/28A745/FFFFFF?text=📋" // Ícone substituível
    },
    {
      label: "Retirar Resultados",
      description: "Receber resultados de exames.",
      color: "#C70039",
      action: "retirar_resultados",
      icon: "https://via.placeholder.com/50/C70039/FFFFFF?text=📄" // Ícone substituível
    },
    {
      label: "Exames Agendados",
      description: "Consulta de exames já marcados.",
      color: "#900C3F",
      action: "exames_agendados",
      icon: "https://via.placeholder.com/50/900C3F/FFFFFF?text=📅" // Ícone substituível
    }
  ]
})

// Método para executar as ações associadas aos botões
const executarAcao = (action: string) => {
  switch (action) {
    case "orcamento":
      console.log("Gerando senha para Atendimento/Orçamento")
      break
    case "preferencial":
      console.log("Gerando senha para Preferencial")
      break
    case "vacina":
      console.log("Gerando senha para Vacina")
      break
    case "agendar_exames":
      console.log("Gerando senha para Agendar Exames")
      break
    case "retirar_resultados":
      console.log("Gerando senha para Retirar Resultados")
      break
    case "exames_agendados":
      console.log("Gerando senha para Exames Agendados")
      break
    default:
      console.warn("Ação desconhecida:", action)
  }
}
</script>

<style scoped>
/* Estilos personalizados para o componente Totem */
.totem-container {
  margin-top: 30px;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px; /* Ajuste a altura conforme necessário */
}

.card-icon {
  width: 80px;
  height: 80px;
}

.card-title {
  font-size: 1.5rem;
  color: #343a40; /* Cinza escuro */
}

.card-text {
  font-size: 1rem;
  color: #6c757d; /* Cinza padrão */
}

.toten-container {
  background-color: #f8f9fa;
}

/* Estilo dos cartões */
.card {
  border-radius: 12px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.icon-wrapper {
  width: 80px;
  height: 80px;
  margin: 0 auto;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 50%;
  height: 50%;
  object-fit: contain;
}

.card-title {
  font-size: 1.2rem;
}

.card-body .btn {
  color: white;
}

.card-body .btn:hover {
  opacity: 0.9;
}
</style>
