<script setup>
import image from "../assets/img/grafico.jpg";
import { formatQuantity } from "../helpers";

defineProps({
  budget: {
    type: Number,
    required: true
  },
  availableBudget: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div class="two-columns">
    <div class="container-grafic">
      <img :src="image" alt="" />
    </div>

    <div class="container-budget">
      <button class="reset-app">Resetear App</button>

      <p>
        <span> Presupuesto: {{ formatQuantity( budget ) }} </span>
      </p>

      <p>
        <span> Disponible: {{ formatQuantity( availableBudget ) }} </span>
      </p>

      <p>
        <span> Gastado: $0 </span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.two-columns {
  display: flex;
  flex-direction: column;
}

.two-columns> :first-child {
  margin-bottom: 3rem;
}

@media (min-width: 768px) {
  .two-columns {
    flex-direction: row;
    gap: 4rem;
    align-items: center;
  }

  .two-columns> :first-child {
    margin-bottom: 0rem;
  }
}

.reset-app {
  background-color: #db2777;
  border: none;
  padding: 1rem;
  color: var(--blanco);
  font-weight: 900;
  width: 100%;
  text-transform: uppercase;
  border-radius: 0.8rem;
  transition-property: background-color;
  transition-duration: 300ms;
}

.reset-app:hover {
  cursor: pointer;
  background-color: #c11d67;

}

.container-budget {
  width: 100%;
}

.container-budget p {
  font-size: 2.4rem;
  text-align: center;
}

@media (min-width: 768px) {
  .container-budget p {
    font-size: 2.4rem;
    text-align: left;
  }
}


.container-budget span {
  font-weight: 900;
  color: var(--azul);
}
</style>
