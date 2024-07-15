<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white rounded-lg p-6">
            <h2 class="text-lg font-medium mb-4">Вы уверены, что хотите удалить запись?</h2>
            <div class="flex gap-2">
                <button @click="confirmDelete" class="flex-1 bg-red-500 text-white rounded px-4 py-2">Удалить</button>
                <button @click="cancelDelete" class="flex-1 bg-gray-300 text-gray-800 rounded px-4 py-2">Отмена</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            show: {
                type: Boolean,
                required: true
            }
        },
        emits: ['confirm', 'cancel'],
        methods: {
            confirmDelete() {
                this.$emit('confirm');
            },
            cancelDelete() {
                this.$emit('cancel');
            }
        }
    };
</script>