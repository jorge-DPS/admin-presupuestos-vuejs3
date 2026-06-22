<script setup></script>

<template>
  <div class="alert">
    <slot></slot>
  </div>
</template>

<style scoped>
.alert {
  margin-bottom: 2.5rem;
  padding: 1.4rem 2rem;
  font-weight: 700;
  font-size: 1.4rem;
  text-align: center;
  background-color: rgba(244, 63, 94, 0.06);
  border-left: 0.4rem solid var(--rojo);
  border-radius: var(--radius-sm);
  color: var(--rojo-oscuro);
  box-shadow: 0 4px 12px rgba(244, 63, 94, 0.03);
}
</style>
