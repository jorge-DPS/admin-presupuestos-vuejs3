<script setup>
import { ref } from 'vue';
import Budget from './components/budget.vue';

const budget = ref(0)

const defineBadget = (quantity) => {
  console.log('cantitdad', quantity);
  
  budget.value = quantity;
}

</script>
<template>
  <div>
    <header>
      <h1>Planificador de gastos</h1>

      <div class="container-header container shadow">

        <Budget
        v-if="budget.value === 0"
        @define-budget="defineBadget"
        />

      </div>
    </header>
  </div>
</template>



<style >
  :root{
    --azul: #3b82f6;
    --blanco: #FFF;
    --gris-claro: #F5F5F5;
    --gris: #94a3b8;
    --gris-oscuro: #64748b;
    --negro: #000;
  }

  html {
    font-size: 62.5%;
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    font-size: 1.6rem;
    font-family: 'Lato', sans-serif;
    background-color: var(--gris-claro);
  }

  h1 {
    font-size: 4rem;
  }

  h2 {
    font-size: 3rem;
  }

  header{
    background: var(--azul);
  }

  header h1 {
    padding: 3rem 0;
    margin: 0;
    color: var(--blanco);
    text-align: center;
  }

  .container {
    width: 90%;
    max-width: 80rem;
    margin: 0 auto;
  }

  .container-header {
    margin-top: -5rem;
    transform: translateY(5rem);
    padding: 5rem;
  }

  .shadow {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    background-color: var(--blanco);
    border-radius: 1.2rem;
    padding: 5rem;
  }
  
</style>