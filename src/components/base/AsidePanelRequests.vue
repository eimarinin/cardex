<template>
    <aside class="p-4 w-1/4 h-full bg-gray-700 flex flex-col gap-6 justify-center">
        <Navbar />

        <p class="text-gray-200">Поиск по заданным фильтрам</p>

        <form aria-label="Поиск запросов" class="flex flex-col gap-2 rounded bg-gray-500 p-2">
            <label for="dateStart" class="text-gray-200">Дата поступления С:</label>
            <input v-model="dateStart" @input="updateFilters" id="dateStart" type="date" name="DateStart"
                class="rounded w-full p-1">

            <label for="dateEnd" class="text-gray-200">Дата поступления По:</label>
            <input v-model="dateEnd" @input="updateFilters" id="dateEnd" type="date" name="EndStart"
                class="rounded w-full p-1">

            <label for="dealer" class="text-gray-200">Дилер</label>
            <input v-model="dealer" @input="updateFilters" id="dealer" type="search" name="Dealer"
                class="rounded w-full p-1">

            <label for="client" class="text-gray-200">Клиент</label>
            <input v-model="client" @input="updateFilters" id="client" type="search" name="Client"
                class="rounded w-full p-1">
        </form>
    </aside>
</template>

<script setup>
    import { ref, defineEmits } from 'vue';
    import Navbar from './Navbar.vue';

    const dateStart = ref('');
    const dateEnd = ref('');
    const dealer = ref('');
    const client = ref('');

    // Define custom event for filters update
    const emitUpdateFilters = defineEmits(['filters-updated']);

    // Method to update filters and emit event
    const updateFilters = () => {
        const filters = {
            dateStart: dateStart.value,
            dateEnd: dateEnd.value,
            dealer: dealer.value,
            client: client.value
        };
        emitUpdateFilters('filters-updated', filters);
    };
</script>