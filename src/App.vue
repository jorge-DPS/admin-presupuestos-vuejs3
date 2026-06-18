<script setup>
import { reactive, ref } from "vue";
import Budget from "./components/budget.vue";
import ControlBudget from "./components/ControlBudget.vue";
import iconNewExpense from "./assets/img/nuevo-gasto.svg";
import Modal from "./components/Modal.vue";

const modal = reactive({
  show: false,
  animate: false,
});

const budget = ref(0);
const availableBudget = ref(0);

const expenseArray = ref([])

const expenditure = reactive({
  name: "",
  quantity: "",
  category: "",
  id: null,
  date: Date.now(),
});


const defineBadget = (quantity) => {
  budget.value = quantity;
  availableBudget.value = quantity;
};

const showModal = () => {
  modal.show = true;
  setTimeout(() => {
    modal.animate = true;
  }, 300);
};

const hideModal = () => {
  modal.animate = false;
  
  setTimeout(() => {
    modal.show = false;
  }, 300);
};

const saveExpense = () => {
  console.log('desde el app', expenditure);
  expenseArray.value.push({
    ...expenditure,
    id: 123
  })
}

</script>
<template>
  <div>
    <header>
      <h1>Planificador de gastos</h1>

      <div class="container-header container shadow">
        <Budget v-if="budget === 0" @define-budget="defineBadget" />
        <ControlBudget
          v-else
          :budget="budget"
          :available-budget="availableBudget"
        />
      </div>
    </header>

    <main v-if="budget > 0">
      <div class="create-expense">
        <img :src="iconNewExpense" alt="Nuevo Gasto" @click="showModal" />
      </div>

      <Modal 
        v-if="modal.show" 
        @hide-modal="hideModal" 
        @save-expense="saveExpense"
        :modal="modal"  
        v-model:name="expenditure.name"
        v-model:quantity="expenditure.quantity"
        v-model:category="expenditure.category"
      />
    </main>
  </div>
</template>

<style>
:root {
  --azul: #3b82f6;
  --blanco: #fff;
  --gris-claro: #f5f5f5;
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
  font-family: "Lato", sans-serif;
  background-color: var(--gris-claro);
}

h1 {
  font-size: 4rem;
}

h2 {
  font-size: 3rem;
}

header {
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

/* icono de gasto */
.create-expense {
  position: fixed;
  bottom: 5rem;
  right: 5rem;
}

.create-expense img {
  width: 5rem;
}

.create-expense img:hover {
  cursor: pointer;
}
</style>
