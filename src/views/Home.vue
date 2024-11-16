<template>
    <div>
      <h1>Home Page</h1>
      <p>Bem-vindo à página inicial!</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'Home',
  });
  </script>
  
  <style scoped>
  /* Estilos específicos para o componente Home */
  h1 {
    color: #42b983;
  }
  </style>
  