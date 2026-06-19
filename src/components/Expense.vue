
<script setup>
import { formatQuantity } from '../helpers';


const props = defineProps({
    expense: {
        type: Object,
        required: true,
    }
});



</script>

<template>
    <div class="expense shadow">
        <div class="content">
            <div class="details">
                <p class="category">{{ expense.category }}</p>
                <p class="name">{{ expense.name }}</p>

                <p class="date">{{ expense.date }}</p>

            </div>
        </div>

        <p class="quantity">{{ formatQuantity(expense.quantity) }}</p>
    </div>
</template>


<style scoped>

</style>