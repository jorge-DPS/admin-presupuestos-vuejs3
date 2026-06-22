<script setup>
import CircleProgressModule from 'vue3-circle-progress'
import 'vue3-circle-progress/dist/circle-progress.css'
import { formatQuantity } from "../helpers";
import { computed } from 'vue';

const CircleProgress = CircleProgressModule.default

const props = defineProps({
  budget: {
    type: Number,
    required: true
  },
  availableBudget: {
    type: Number,
    required: true
  },
  spent: {
    type: Number,
    required: true
  }
})

const porcentaje = computed(() => {
   return parseInt(((props.budget - props.availableBudget) / props.budget ) * 100)
})

defineEmits(['reset-app'])
</script>

<template>
  <div class="two-columns">
    <div class="container-grafic">
      <p class="porcentaje">{{ porcentaje }}%</p>
      <CircleProgress
        :percent="porcentaje"
        :size="220"
        :border-width="16"
        :border-bg-width="16"
        fill-color="#4f46e5"
        empty-color="#f1f5f9"
      />
    </div>

    <div class="container-budget">
      <button class="reset-app" @click="$emit('reset-app')">
        Resetear Presupuesto
      </button>

      <p class="metric-card">
        <span class="label">Presupuesto</span>
        <span class="value budget-value">{{ formatQuantity( budget ) }}</span>
      </p>

      <p class="metric-card">
        <span class="label">Disponible</span>
        <span class="value" :class="[availableBudget < 0 ? 'negative' : 'positive']">
          {{ formatQuantity( availableBudget ) }}
        </span>
      </p>

      <p class="metric-card">
        <span class="label">Gastado</span>
        <span class="value spent-value">{{ formatQuantity( spent ) }}</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.two-columns {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  align-items: center;
}

@media (min-width: 768px) {
  .two-columns {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 6rem;
  }
}

.container-grafic {
  position: relative;
  display: grid;
  place-items: center;
  flex: 1;
}

.porcentaje {
  position: absolute;
  margin: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 2;
  font-size: 3.4rem;
  font-weight: 800;
  color: var(--negro);
  letter-spacing: -0.03em;
}

.container-budget {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  flex: 1.2;
}

.reset-app {
  background-color: #f1f5f9;
  border: 1px solid #e2e8f0;
  padding: 1.2rem;
  color: var(--rojo);
  font-weight: 800;
  width: 100%;
  text-transform: uppercase;
  border-radius: var(--radius-md);
  letter-spacing: 0.05em;
  font-size: 1.3rem;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: var(--shadow-sm);
  margin-bottom: 0.8rem;
}

.reset-app:hover {
  cursor: pointer;
  background-color: var(--rojo);
  border-color: var(--rojo);
  color: var(--blanco);
  box-shadow: 0 8px 20px rgba(244, 63, 94, 0.2);
  transform: translateY(-2px);
}

.reset-app:active {
  transform: translateY(0);
}

.metric-card {
  background-color: var(--gris-claro);
  border: 1px solid rgba(0, 0, 0, 0.03);
  border-radius: var(--radius-md);
  margin: 0;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--shadow-sm);
}

.metric-card .label {
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--gris-oscuro);
}

.metric-card .value {
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.metric-card .budget-value {
  color: var(--azul);
}

.metric-card .positive {
  color: #10b981; /* Emerald */
}

.metric-card .negative {
  color: var(--rojo); /* Rose */
}

.metric-card .spent-value {
  color: var(--negro);
}
</style>
