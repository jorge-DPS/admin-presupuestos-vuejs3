<script setup></script>

<template>
  <div class="alert">
    <slot></slot>
  </div>
</template>

<style scoped>
.alert {
  margin-bottom: 2.5rem;
  padding: 1rem;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 1.6rem;
  text-align: center;
  background: var(--blanco);
  border-left: 0.5rem solid #891c1c;
  color: #891c1c;
}
</style>
