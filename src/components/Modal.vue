<script setup>
import closeModal from '../assets/img/cerrar.svg'

const emit = defineEmits(['hide-modal'])


</script>

<template>
  <div class="modal">
    <div class="close-modal">
        <img 
            :src="closeModal"
            @click="$emit('hide-modal')"
        />
    </div>

    <div class="container">
        <form>
            <legend>Añadir Gasto</legend>
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
</style>