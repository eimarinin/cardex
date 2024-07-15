<template>
    <div v-if="showModal"
        class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
        <div class="bg-white rounded-lg p-8 max-w-md w-full">
            <form @submit.prevent="addRequest" class="flex flex-col gap-2 p-4">
                <input v-model="dealer" type="text" placeholder="Dealer" required class="rounded border-2 p-2" />
                <input v-model="client" type="text" placeholder="Client" required class="rounded border-2 p-2" />
                <input v-model="date" type="date" required class="rounded border-2 p-2" />
                <input v-model="stage" type="text" placeholder="Stage" required class="rounded border-2 p-2" />
                <input v-model="status" type="text" placeholder="Status" required class="rounded border-2 p-2" />
                <textarea v-model="comment" placeholder="Comment" class="rounded border-2 p-2"></textarea>
                <button type="submit" class="bg-blue-500 text-white rounded p-2">Add Request</button>
                <button type="button" @click="closeModal"
                    class="bg-gray-300 text-gray-800 rounded p-2 mt-2">Close</button>
            </form>
        </div>
    </div>

    <button type="button" @click="showModal = true" class="bg-blue-400 text-white rounded p-2">
        Добавить запрос
    </button>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'AddRequestForm',

        data() {
            return {
                dealer: '',
                client: '',
                date: '',
                stage: '',
                status: '',
                comment: '',
                showModal: false
            };
        },

        methods: {
            async addRequest() {
                try {
                    await axios.post('http://localhost:3000/api/requests', {
                        dealer: this.dealer,
                        client: this.client,
                        date: this.date,
                        stage: this.stage,
                        status: this.status,
                        comment: this.comment
                    });
                    alert('Request added');
                    this.clearForm();
                    this.closeModal();
                } catch (error) {
                    alert('Failed to add request');
                    console.error(error);
                }
            },

            clearForm() {
                this.dealer = '';
                this.client = '';
                this.date = '';
                this.stage = '';
                this.status = '';
                this.comment = '';
            },

            closeModal() {
                this.showModal = false;
            }
        }
    };
</script>