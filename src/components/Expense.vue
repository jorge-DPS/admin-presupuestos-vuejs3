<script setup>
import { formatDate, formatQuantity } from "../helpers";
import IconoAhorro from "../assets/img/icono_ahorro.svg";
import IconoCasa from "../assets/img/icono_casa.svg";
import IconoComida from "../assets/img/icono_comida.svg";
import IconoGastos from "../assets/img/icono_gastos.svg";
import IconoOcio from "../assets/img/icono_ocio.svg";
import IconoSalud from "../assets/img/icono_salud.svg";
import IconoSuscripciones from "../assets/img/icono_suscripciones.svg";

const diccionarioIconos = {
  ahorro: IconoAhorro,
  comida: IconoComida,
  casa: IconoCasa,
  gastos: IconoGastos,
  ocio: IconoOcio,
  salud: IconoSalud,
  suscripciones: IconoSuscripciones,
};

const props = defineProps({
  expense: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['select-spend', 'delete-spend'])
</script>

<template>
  <div class="expense shadow" :class="expense.category">
    <div class="content">
      <div class="icon-wrapper" :class="expense.category">
        <img :src="diccionarioIconos[expense.category]" alt="Icono expense" class="icon" />
      </div>
      <div class="details">
        <span class="category-badge" :class="expense.category">{{ expense.category }}</span>
        <p class="name">{{ expense.name }}</p>
        <p class="date">
          Fecha: <span>{{ formatDate( expense.date ) }}</span>
        </p>
      </div>
    </div>

    <div class="expense-actions">
      <p class="quantity">{{ formatQuantity(expense.quantity) }}</p>
      <div class="buttons">
        <button type="button" class="button edit" @click="$emit('select-spend', expense.id)">
          Editar
        </button>
        <button type="button" class="button delete" @click="$emit('delete-spend', expense.id)">
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.expense {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2rem;
  border-left: 0.6rem solid var(--azul);
  padding: 2.5rem 3rem;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  background-color: var(--blanco);
}

.expense:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

/* Bordes izquierdos personalizados */
.expense.ahorro { border-left-color: #10b981; }
.expense.comida { border-left-color: #f59e0b; }
.expense.casa { border-left-color: #3b82f6; }
.expense.gastos { border-left-color: #64748b; }
.expense.ocio { border-left-color: #ec4899; }
.expense.salud { border-left-color: #f43f5e; }
.expense.suscripciones { border-left-color: #6366f1; }

@media (min-width: 768px) {
  .expense {
    flex-direction: row;
    align-items: center;
  }
}

.content {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

.icon-wrapper {
  width: 6.5rem;
  height: 6.5rem;
  border-radius: var(--radius-md);
  display: grid;
  place-items: center;
  background-color: var(--gris-claro);
  padding: 1.2rem;
}

/* Colores suaves para los iconos */
.icon-wrapper.ahorro { background-color: #e6fcf5; }
.icon-wrapper.comida { background-color: #fff9db; }
.icon-wrapper.casa { background-color: #e7f5ff; }
.icon-wrapper.gastos { background-color: #f1f3f5; }
.icon-wrapper.ocio { background-color: #fff0f6; }
.icon-wrapper.salud { background-color: #fff5f5; }
.icon-wrapper.suscripciones { background-color: #edf2ff; }

.icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.details p {
  margin: 0;
}

.category-badge {
  display: inline-block;
  padding: 0.4rem 1.2rem;
  font-size: 1.1rem;
  font-weight: 800;
  text-transform: uppercase;
  border-radius: 2rem;
  letter-spacing: 0.05em;
  margin-bottom: 0.8rem;
}

.category-badge.ahorro { background-color: #d1fae5; color: #065f46; }
.category-badge.comida { background-color: #fef3c7; color: #92400e; }
.category-badge.casa { background-color: #dbeafe; color: #1e40af; }
.category-badge.gastos { background-color: #f1f5f9; color: #334155; }
.category-badge.ocio { background-color: #fce7f3; color: #9d174d; }
.category-badge.salud { background-color: #ffe4e6; color: #9f1239; }
.category-badge.suscripciones { background-color: #e0e7ff; color: #3730a3; }

.name {
  color: var(--negro);
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 0.6rem !important;
  letter-spacing: -0.01em;
}

.date {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--gris-oscuro);
}

.date span {
  font-weight: 400;
  color: var(--gris-oscuro);
}

.quantity {
  color: var(--negro);
  font-size: 2.6rem;
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.02em;
}

.expense-actions {
  display: grid;
  gap: 1.5rem;
  justify-items: start;
}

@media (min-width: 768px) {
  .expense-actions {
    justify-items: end;
  }
}

.buttons {
  display: flex;
  gap: 0.8rem;
}

.button {
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-weight: 800;
  padding: 0.8rem 1.6rem;
  text-transform: uppercase;
  font-size: 1.2rem;
  letter-spacing: 0.02em;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.edit {
  background-color: rgba(79, 70, 229, 0.08);
  color: var(--azul);
}

.edit:hover {
  background-color: var(--azul);
  color: var(--blanco);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.15);
  transform: translateY(-1px);
}

.delete {
  background-color: rgba(244, 63, 94, 0.08);
  color: var(--rojo);
}

.delete:hover {
  background-color: var(--rojo);
  color: var(--blanco);
  box-shadow: 0 4px 12px rgba(244, 63, 94, 0.15);
  transform: translateY(-1px);
}

.button:active {
  transform: translateY(0);
}
</style>
