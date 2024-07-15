<template>
    <aside class="p-4 w-1/4 h-full bg-gray-700 flex flex-col gap-6 justify-center">
        <Navbar />

        <p class="text-gray-200">Поиск по заданным фильтрам</p>

        <form aria-label="Поиск приборов" class="flex flex-col gap-2 rounded bg-gray-500 p-2">
            <label for="device" class="text-gray-200">Прибор</label>
            <input v-model="device" @input="updateFilters" id="device" type="search" name="Device"
                class="rounded w-full p-1">
        </form>
    </aside>
</template>

<script setup>
    import { ref, defineEmits } from 'vue';
    import Navbar from './Navbar.vue';

    const device = ref('');

    // Define custom event for filters update
    const emitUpdateFilters = defineEmits(['filters-updated']);

    // Method to update filters and emit event
    const updateFilters = () => {
        const filters = {
            device: device.value
        };
        emitUpdateFilters('filters-updated', filters);
    };
</script>