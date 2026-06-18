<script setup>
import { ref } from "vue";
import closeModal from "../assets/img/cerrar.svg";
import Alert from "./Alert.vue";

const error = ref('')

const emit = defineEmits(["hide-modal", 'update:name', 'update:quantity', 'update:category', 'save-expense']);

const props = defineProps({
  modal: {
    type: Object,
    required: true,
  },
  name: {
    type: String,
    required:true
  },
  quantity: {
    type: [String, Number],
    required:true
  },
  category: {
    type: String,
    required:true
  }
});

const addExpense = () => {
  // validar que no haya campos vacios

  const { name, quantity, category } = props
  if ([name, quantity, category].includes('')) {
    error.value = 'Todos los campos son obligatorios'
    setTimeout(() => {
      error.value = ''
    }, 3000);
    return
  }

  // Validar la Cantidad
  if (quantity <= 0) {
    error.value = 'La cantidad debe ser mayor a 0'
    setTimeout(() => {
      error.value = ''
    }, 3000);
    return
  }

emit('save-expense')
  
}


</script>

<template>
  <div class="modal">
    <div class="close-modal">
      <img :src="closeModal" @click="$emit('hide-modal')" />
    </div>

    <div 
      class="container container-form"
      :class="[modal.animate ? 'animate' : 'close']"
      >
      <form class="new-expense">
        <legend>Añadir Gasto</legend>
        <Alert v-if="error">{{ error }}</Alert>
        <div class="field">
          <label for="name">Nombre gasto:</label>
          <input
            type="text"
            id="name"
            placeholder="Añade el nombre del gasto"
            :value="name"
            @input="$emit('update:name', $event.target.value)"
          />
        </div>

        <!-- Cantidad -->
        <div class="field">
          <label for="quantity">Cantidad: </label>
          <input
            type="text"
            id="quantity"
            placeholder="Añade la cantidad del gasto, ej. 300"
            :value="quantity"
            @input="$emit('update:quantity', +$event.target.value)"

          />
        </div>

        <!-- categoria -->
        <div class="field">
          <label for="category">Categoria: </label>
          <select id="category" :value="category" @input="$emit('update:category', $event.target.value)">
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

        <input type="submit" value="Añadir gasto" @click.prevent="addExpense"/>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: absolute;
  background-color: rgb(0 0 0 / 0.9);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.close-modal {
  position: absolute;
  top: 3rem;
  right: 3rem;
}

.close-modal img {
  width: 3rem;
  cursor: pointer;
}

.container-form {
  transition-property: all;
  transition-duration: 300ms;
  transition-timing-function: ease-in;
  opacity: 0;
}

.container-form.animate {
  opacity: 1;
}

.container-form.close {
  opacity: 0;
}

.new-expense {
  margin: 10rem auto 0 auto;
  display: grid;
  gap: 2rem;
}

.new-expense legend {
  text-align: center;
  color: var(--blanco);
  font-size: 3rem;
  font-weight: 700;
}

.field {
  display: grid;
  gap: 2rem;
}

.new-expense input,
.new-expense select {
  background-color: var(--gris-claro);
  border-radius: 1rem;
  padding: 1rem;
  border: none;
  font-size: 2.2rem;
  }

.new-expense label {
  color: var(--blanco);
  font-size: 3rem;

}

.new-expense input[type="submit"] {
  background-color: var(--azul);
  color: var(--blanco);
  font-weight: 700;
  cursor: pointer;
}

</style>
