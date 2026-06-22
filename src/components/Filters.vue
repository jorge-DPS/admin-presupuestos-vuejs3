<script setup>
defineProps(['filter'])
defineEmits(['update:filter'])

</script>

<template>
  <div class="filters shadow container">
    <form>
      <div class="field">
        <label for="filter">Filtrar gastos</label>
        <select
          id="filter"
          :value="filter"
          @input="$emit('update:filter', $event.target.value)"
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
    </form>
  </div>
</template>

<style scoped>
.filters {
  margin-top: 6rem;
}

.filters .field {
  display: flex;
  align-items: center;
  gap: 2rem;
  justify-content: space-between;
}

.filters label {
  font-size: 2rem;
  font-weight: 800;
  color: var(--negro);
  letter-spacing: -0.01em;
}

.filters select {
  flex: 1;
  padding: 1.2rem 2rem;
  border: 2px solid var(--gris);
  border-radius: var(--radius-md);
  background-color: var(--gris-claro);
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--negro);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
}

.filters select:focus {
  outline: none;
  border-color: var(--azul);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.12);
  background-color: var(--blanco);
}
</style>
