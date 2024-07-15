<script setup>
    import BtnPrimarySolid from '../btn/primary/solid/BtnPrimarySolid.vue'
</script>

<template>
    <div class="flex flex-row flex-wrap gap-4 py-4 justify-center">
        <BtnPrimarySolid href="/" title="Приборы" />
        <BtnPrimarySolid href="/requests" title="Запросы" />
        <BtnPrimarySolid href="/offers" title="КП" />
    </div>
</template>

<script>
    export default {
        name: 'Navbar',
    }
</script>