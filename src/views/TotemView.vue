<template>
  <div class="container totem-container">
    <h1 class="text-center">Sistema de Senhas</h1>
    <p class="text-center">Selecione o tipo de atendimento desejado</p>

    <div class="row">
      <!-- Senha Normal -->
      <div class="col-md-6 mb-4 d-flex align-items-stretch">
        <div class="card p-3 w-100 text-center">
          <div class="icon-container">
            <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="Senha Normal" class="card-icon mb-3" />
          </div>
          <h2 class="card-title">Senha Normal</h2>
          <p class="card-text">Atendimento por ordem de chegada</p>
          <button class="btn btn-primary w-100 mt-auto">Gerar Senha Normal</button>
        </div>
      </div>

      <!-- Senha Prioritária -->
      <div class="col-md-6 mb-4 d-flex align-items-stretch">
        <div class="card p-3 w-100 text-center">
          <div class="icon-container">
            <img src="https://cdn-icons-png.flaticon.com/512/833/833472.png" alt="Senha Prioritária" class="card-icon mb-3" />
          </div>
          <h2 class="card-title">Senha Prioritária</h2>
          <p class="card-text">Atendimento preferencial</p>
          <button class="btn btn-success w-100 mt-auto">Gerar Senha Prioritária</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TotemView",
};
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
</style>
