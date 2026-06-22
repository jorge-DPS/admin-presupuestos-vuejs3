<script setup>
import { ref } from "vue";
import Alert from "./Alert.vue";

const budget = ref(0);
const error = ref("");

const emit = defineEmits(["define-budget"]);


const defineBudget = () => {
  if (budget.value <= 0 || budget.value === "") {
    error.value = "presupuesto no válido";

    setTimeout(() => {
      error.value = "";
    }, 3000);
    return;
  }

  emit('define-budget', budget.value)
};
</script>

<template>
  <form class="budget" @submit.prevent="defineBudget">
    <Alert v-if="error">
      {{ error }}
    </Alert>
    <div class="campo">
      <label for="new-budget">Definir Presupuesto</label>
      <input
        id="new-budget"
        class="new-budget"
        placeholder="Añade tu presupuesto"
        type="number"
        min="0"
        v-model.number="budget"
      />
    </div>
    <input type="submit" value="definir presupuesto" />
  </form>
</template>

<style scoped>
.budget {
  width: 100%;
}

.campo {
  display: grid;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.budget label {
  font-size: 2rem;
  color: var(--azul);
  font-weight: 800;
  text-align: center;
  letter-spacing: -0.01em;
}

.budget input[type="number"] {
  background-color: var(--gris-claro);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  border: 2px solid var(--gris);
  font-size: 2rem;
  text-align: center;
  font-weight: 700;
  color: var(--negro);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.budget input[type="number"]:focus {
  outline: none;
  border-color: var(--azul);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.12);
  background-color: var(--blanco);
}

.budget input[type="submit"] {
  background: linear-gradient(135deg, var(--azul) 0%, var(--azul-oscuro) 100%);
  border: none;
  padding: 1.4rem;
  font-size: 1.8rem;
  margin-top: 1.5rem;
  color: var(--blanco);
  font-weight: 800;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: var(--radius-md);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
}

.budget input[type="submit"]:hover {
  cursor: pointer;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.35);
}

.budget input[type="submit"]:active {
  transform: translateY(0);
}
</style>
