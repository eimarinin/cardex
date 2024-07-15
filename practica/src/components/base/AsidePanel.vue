<script setup>
    import Navbar from './Navbar.vue'  
</script>

<template>
    <aside class="p-4 w-1/4 h-full bg-gray-700 flex flex-col gap-6 justify-center">
        <Navbar />

        <p class="text-gray-200">
            Поиск по заданным фильтрам
        </p>

        <form action="/" method="GET" aria-label="Поиск по дате поступления"
            class="flex flex-col gap-2 rounded bg-gray-500 p-2">
            <p class="text-gray-200">
                Дата поступления
            </p>

            <div class="grid auto-cols-max grid-cols-[auto,1fr] gap-2 items-center">
                <label for="dateStart" class="text-gray-200">С:</label>
                <input id="dateStart" type="date" name="DateStart" class="rounded w-full p-1">

                <label for="dateEnd" class="text-gray-200">По:</label>
                <input id="dateEnd" type="date" name="EndStart" class="rounded w-full p-1">
            </div>
        </form>

        <form action="/" method="GET" aria-label="Поиск по дилерам" class="flex flex-col gap-2 rounded bg-gray-500 p-2">
            <label for="dealer" class="text-gray-200">Дилер</label>
            <input id="dealer" type="search" name="Dealer" class="rounded w-full p-1">
        </form>

        <form action="/" method="GET" aria-label="Поиск по клиентам"
            class="flex flex-col gap-2 rounded bg-gray-500 p-2">
            <label for="client" class="text-gray-200">Клиент</label>
            <input id="client" type="search" name="Client" class="rounded w-full p-1">
        </form>
    </aside>
</template>

<script>
    export default {
        name: 'AsidePanel',
    }
</script>