<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import Budget from "./components/budget.vue";
import ControlBudget from "./components/ControlBudget.vue";
import iconNewExpense from "./assets/img/nuevo-gasto.svg";
import Modal from "./components/Modal.vue";
import { generarId } from "./helpers";
import Expense from "./components/Expense.vue";
import Filters from "./components/Filters.vue"

const modal = reactive({
  show: false,
  animate: false,
});

const budget = ref(0);
const availableBudget = ref(0); //-> availableBudget = presupuesto disponible
const spent = ref(0); // -> gastos
const filter = ref('')

const expenseArray = ref([]); // -> lista de gastos

const expenditure = reactive({
  name: "",
  quantity: "",
  category: "",
  id: null,
  date: Date.now(),
});

watch(expenseArray, () => {
  const totalSpent = expenseArray.value.reduce(( acumulador, currentItem) => {
    // console.log( acumulador + currentItem.quantity);
    return  acumulador + currentItem.quantity;
  }, 0);
  spent.value = totalSpent
  availableBudget.value = budget.value - totalSpent

  localStorage.setItem('gastos', JSON.stringify(expenseArray.value))
}, {
  deep: true
})

watch(modal, () => {
  if (!modal.show) {
    resetStateGasto()
  }
})

watch(budget, () => {
  localStorage.setItem('budget', budget.value)
})

onMounted(() => {
  const budgetStorage = localStorage.getItem('budget')
  if (budgetStorage) {
    budget.value = Number(budgetStorage)
    availableBudget.value = Number(budgetStorage)
  }

  const expenseStorage = localStorage.getItem('gastos')
  if (expenseStorage) {
    expenseArray.value = JSON.parse(expenseStorage)
  }
})

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
  // console.log("desde el app", expenditure);
  if (expenditure.id) {
    // si tiene el id estamos editando
    // console.log('esta editando', expenditure.id);
    const positionIndex = expenseArray.value.findIndex( (item) => item.id === expenditure.id)
    expenseArray.value[positionIndex] = {...expenditure}
    
  }else {
    // si no tiene el id, estamos creando
    expenseArray.value.push({
    ...expenditure,
    id: generarId(),
  });
  }
  

  hideModal();
  // Reiniciar el objeto
  resetStateGasto()
  
};

const resetStateGasto = () => {
  Object.assign(expenditure, {
    name: "",
    quantity: "",
    category: "",
    id: null,
    date: Date.now(),
  });
}

// seleccionar lo gastado
const selectSpend = (id) => {
  // console.log('desde la funcion del select', id);
  const gastoEditar = expenseArray.value.filter( (expense) => expense.id === id )[0]
  Object.assign(expenditure, gastoEditar)
  showModal()
  
}

const deleteSpend = (id) => {
  expenseArray.value = expenseArray.value.filter((expense) => expense.id !== id);
}

const gastosFiltrados = computed(() => {
  if (filter.value) {
    return expenseArray.value.filter( gasto => gasto.category === filter.value)
  }

  return expenseArray.value
})

const resetApp = () => {
  if (confirm('¿Deseas reiniciar presupuesto y gastos?')) {
    budget.value = 0
    expenseArray.value = []
  }
}

</script>
<template>
  <div :class="{ fix: modal.show }">
    <header>
      <h1>Planificador de gastos</h1>

      <div class="container-header container shadow">
        <Budget v-if="budget === 0" @define-budget="defineBadget" />
        <ControlBudget
          v-else
          :budget="budget"
          :available-budget="availableBudget"
          :spent="spent"
          @reset-app="resetApp"
        />
      </div>
    </header>

    <main v-if="budget > 0">
      <Filters
      v-model:filter="filter"
      />
      <div class="list-expense container">
        <h2>{{ gastosFiltrados.length > 0 ? 'Gastos' : 'No hay gastos' }}</h2>
        <Expense 
          v-for="expense in gastosFiltrados"
          :key="expense.id"
          :expense="expense"
          @select-spend="selectSpend"
          @delete-spend="deleteSpend"
        />
      </div>

      <div class="create-expense">
        <img :src="iconNewExpense" alt="Nuevo Gasto" @click="showModal" />
      </div>

      <Modal
        v-if="modal.show"
        @hide-modal="hideModal"
        @save-expense="saveExpense"
        :modal="modal"
        :available-budget="availableBudget"
        :id="expenditure.id"
        v-model:name="expenditure.name"
        v-model:quantity="expenditure.quantity"
        v-model:category="expenditure.category"
      />
    </main>
  </div>
</template>

<style>
:root {
  --azul: #4f46e5; /* Indigo premium */
  --azul-oscuro: #3730a3;
  --blanco: #ffffff;
  --gris-claro: #f8fafc;
  --gris: #cbd5e1;
  --gris-oscuro: #475569;
  --negro: #0f172a;
  --rojo: #f43f5e; /* Rose premium */
  --rojo-oscuro: #be123c;
  
  /* Nuevas variables */
  --font-sans: "Plus Jakarta Sans", sans-serif;
  --radius-lg: 2rem;
  --radius-md: 1.2rem;
  --radius-sm: 0.8rem;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 8px 30px rgba(15, 23, 42, 0.04);
  --shadow-lg: 0 20px 40px -15px rgba(15, 23, 42, 0.08);
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
  font-family: var(--font-sans);
  background-color: var(--gris-claro);
  background-image: 
    radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.03) 0px, transparent 50%),
    radial-gradient(at 50% 0%, rgba(16, 185, 129, 0.02) 0px, transparent 50%);
  color: var(--negro);
  min-height: 100vh;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1 {
  font-size: 4rem;
}

h2 {
  font-size: 3rem;
}

.fix {
  overflow: hidden;
  height: 100vh;
}

header {
  background: linear-gradient(135deg, #4f46e5 0%, #312e81 100%);
  padding-bottom: 8rem;
  position: relative;
  overflow: hidden;
}

header::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -20%;
  width: 140%;
  height: 200%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 60%);
  pointer-events: none;
}

header h1 {
  padding: 5rem 0 2.5rem;
  margin: 0;
  color: var(--blanco);
  text-align: center;
  font-weight: 800;
  letter-spacing: -0.03em;
  font-size: 4.2rem;
  position: relative;
  z-index: 1;
}

.container {
  width: 90%;
  max-width: 80rem;
  margin: 0 auto;
}

.container-header {
  margin-top: -6rem;
  transform: translateY(6rem);
  position: relative;
  z-index: 2;
}

.shadow {
  box-shadow: var(--shadow-lg);
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: var(--radius-lg);
  padding: 4rem 3rem;
}

/* icono de gasto */
.create-expense {
  position: fixed;
  bottom: 4rem;
  right: 4rem;
  z-index: 5;
}

.create-expense img {
  width: 6.5rem;
  height: 6.5rem;
  border-radius: 50%;
  box-shadow: 0 10px 25px rgba(99, 102, 241, 0.35);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  background-color: var(--blanco);
}

.create-expense img:hover {
  cursor: pointer;
  transform: translateY(-5px) scale(1.08);
  box-shadow: 0 15px 30px rgba(99, 102, 241, 0.5);
}

.list-expense {
  margin-top: 12rem;
  padding-bottom: 10rem;
}

.list-expense h2 {
  font-weight: 800;
  color: var(--negro);
  margin-bottom: 2.5rem;
  letter-spacing: -0.02em;
  font-size: 2.8rem;
}
</style>
