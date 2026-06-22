<script setup>
import { ref } from "vue";
import closeModal from "../assets/img/cerrar.svg";
import Alert from "./Alert.vue";

const error = ref("");

const emit = defineEmits([
  "hide-modal",
  "update:name",
  "update:quantity",
  "update:category",
  "save-expense",
]);

const props = defineProps({
  modal: {
    type: Object,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: [String, Number],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  availableBudget: {
    type: Number,
    required: true,
  },
  id: {
    type: String,
    default: null,
  },
});

const dataOld = props.quantity;

const showError = (message) => {
  error.value = message;

  setTimeout(() => {
    error.value = "";
  }, 3000);
};

const addExpense = () => {
  const { name, quantity, category, availableBudget, id } = props;

  if ([name, quantity, category].includes("")) {
    showError("Todos los campos son obligatorios");
    return;
  }

  if (quantity <= 0) {
    showError("La cantidad debe ser mayor a 0");
    return;
  }

  if (id) {
    if (quantity > dataOld + availableBudget) {
      showError("El monto es mayor al presupuesto disponible");
      return;
    }
  } else if (quantity > availableBudget) {
    showError("El monto es mayor al presupuesto disponible");
    return;
  }

  emit("save-expense");
};
</script>

<template>
  <div class="modal">
    <div class="close-modal">
      <img :src="closeModal" alt="Cerrar modal" @click="$emit('hide-modal')" />
    </div>

    <div
      class="container container-form"
      :class="[modal.animate ? 'animate' : 'close']"
    >
      <form class="new-expense">
        <legend>{{ id ? "Actualizar gasto" : "Agregar gasto" }}</legend>
        <Alert v-if="error">{{ error }}</Alert>

        <div class="field">
          <label for="name">Nombre gasto:</label>
          <input
            id="name"
            type="text"
            placeholder="Agrega el nombre del gasto"
            :value="name"
            @input="$emit('update:name', $event.target.value)"
          />
        </div>

        <div class="field">
          <label for="quantity">Cantidad:</label>
          <input
            id="quantity"
            type="number"
            min="0"
            placeholder="Agrega la cantidad del gasto, ej. 300"
            :value="quantity"
            @input="$emit('update:quantity', +$event.target.value)"
          />
        </div>

        <div class="field">
          <label for="category">Categoria:</label>
          <select
            id="category"
            :value="category"
            @input="$emit('update:category', $event.target.value)"
          >
            <option value="">-- Seleccione --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>

        <input
          type="submit"
          :value="id ? 'Editar gasto' : 'Agregar gasto'"
          @click.prevent="addExpense"
        />
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  background-color: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  z-index: 10;
  display: grid;
  place-items: center;
  padding: 2rem 0;
}

.close-modal {
  position: absolute;
  top: 3rem;
  right: 3rem;
  z-index: 11;
}

.close-modal img {
  width: 3.5rem;
  height: 3.5rem;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  padding: 0.8rem;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.close-modal img:hover {
  transform: scale(1.1) rotate(90deg);
  background-color: rgba(255, 255, 255, 0.2);
}

.container-form {
  max-width: 55rem !important;
  opacity: 0;
  transform: translateY(3rem);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  width: 90%;
}

.container-form.animate {
  opacity: 1;
  transform: translateY(0);
}

.container-form.close {
  opacity: 0;
  transform: translateY(3rem);
}

.new-expense {
  background-color: var(--blanco);
  border-radius: var(--radius-lg);
  box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.3);
  display: grid;
  gap: 2.2rem;
  margin: 4rem auto;
  padding: 4rem 3.5rem;
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.new-expense legend {
  color: var(--negro);
  font-size: 2.8rem;
  font-weight: 800;
  text-align: center;
  letter-spacing: -0.03em;
  margin-bottom: 1rem;
}

.field {
  display: grid;
  gap: 0.8rem;
}

.new-expense label {
  color: var(--gris-oscuro);
  font-size: 1.5rem;
  font-weight: 700;
}

.new-expense input[type="text"],
.new-expense input[type="number"],
.new-expense select {
  background-color: var(--gris-claro);
  border: 2px solid var(--gris);
  border-radius: var(--radius-md);
  font-size: 1.6rem;
  font-weight: 600;
  padding: 1.3rem 1.6rem;
  color: var(--negro);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.new-expense input[type="text"]:focus,
.new-expense input[type="number"]:focus,
.new-expense select:focus {
  border-color: var(--azul);
  outline: none;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.12);
  background-color: var(--blanco);
}

.new-expense input[type="submit"] {
  background: linear-gradient(135deg, var(--azul) 0%, var(--azul-oscuro) 100%);
  border: none;
  color: var(--blanco);
  cursor: pointer;
  font-weight: 800;
  margin-top: 1.5rem;
  padding: 1.5rem;
  border-radius: var(--radius-md);
  font-size: 1.6rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.new-expense input[type="submit"]:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.35);
}

.new-expense input[type="submit"]:active {
  transform: translateY(0);
}
</style>
