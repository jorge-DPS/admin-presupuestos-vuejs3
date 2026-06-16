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
  gap: 2rem;
  margin-bottom: 2rem; /* Añadido para separar el campo del botón */
}

.budget label {
  font-size: 1.8rem; /* Reducido para un aspecto más equilibrado */
  text-align: left; /* Alineado a la izquierda para mejor legibilidad */
  color: var(--azul);
  font-weight: 700; /* Más énfasis en la etiqueta */
  margin-bottom: 0.5rem; /* Pequeña separación de la entrada */
  text-align: center;

}

.budget input[type="number"] {
  background-color: var(--gris-claro);
  border-radius: 1rem;
  padding: 1.2rem; /* Un poco más de padding para un mejor tacto */
  border: 1px solid var(--gris); /* Borde sutil para definir el campo */
  font-size: 1.8rem; /* Reducido para un aspecto más equilibrado */
  text-align: left; /* Alineado a la izquierda para una entrada de número estándar */
  transition: border-color 0.3s ease; /* Transición suave para el enfoque */
}

.budget input[type="number"]:focus {
  outline: none; /* Elimina el contorno predeterminado del navegador */
  border-color: var(--azul); /* Cambia el color del borde al enfocar */
}

.budget input[type="submit"] {
  background-color: var(--azul);
  border: none;
  padding: 1rem;
  font-size: 2rem;
  margin-top: 2rem;
  color: var(--blanco);
  font-weight: 900;
  width: 100%;
  transition: background-color 300ms ease;
  border-radius: 0.8rem; /* Bordes ligeramente redondeados para que coincida con el contenedor */
}

.budget input[type="submit"]:hover {
  background-color: #1048a4;
  cursor: pointer;
}
</style>
