<script setup>
    import LinkPrimarySolid from '../btn/primary/solid/LinkPrimarySolid.vue'
</script>

<template>
    <div class="flex flex-row flex-wrap gap-4 py-4 justify-center">
        <LinkPrimarySolid href="/" title="Запросы" />
        <LinkPrimarySolid href="/offers" title="КП" />
    </div>
</template>

<script>
    export default {
        name: 'Navbar',
    }
</script>