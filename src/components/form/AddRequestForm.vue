<template>
    <div v-if="showModal"
        class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
        <div class="bg-white rounded-lg p-8 max-w-md w-full">
            <form @submit.prevent="addRequest" class="flex flex-col gap-2 p-4">
                <input name="Dealer" v-model="dealer" type="text" placeholder="Дилер" required
                    class="rounded border-2 p-2" />
                <input name="Client" v-model="client" type="text" placeholder="Клиент" required
                    class="rounded border-2 p-2" />
                <input name="Date" v-model="date" type="date" required class="rounded border-2 p-2" />

                <select name="Stage" v-model="stage" required class="rounded border-2 p-2">
                    <option disabled value="">Этап</option>
                    <option value="Начальный">Начальный</option>
                    <option value="В процессе">В процессе</option>
                    <option value="Завершён">Завершён</option>
                </select>

                <select name="Status" v-model="status" required class="rounded border-2 p-2">
                    <option disabled value="">Статус</option>
                    <option value="Ожидание">Ожидание</option>
                    <option value="Одобрено">Одобрено</option>
                    <option value="Отклонено">Отклонено</option>
                </select>

                <select name="OfferID" v-model="offerID" required class="rounded border-2 p-2">
                    <option disabled value="">Выберите предложение</option>
                    <option v-for="offer in offers" :key="offer.id" :value="offer.id">{{ offer.device }}</option>
                </select>

                <textarea name="Comment" v-model="comment" placeholder="Комментарий"
                    class="rounded border-2 p-2"></textarea>
                <BtnPrimarySolid type="submit" title="Добавить запрос" />
                <button type="button" @click="closeModal"
                    class="bg-gray-300 text-gray-800 rounded p-2 mt-2">Закрыть</button>
            </form>
        </div>
    </div>

    <BtnPrimarySolid type="button" @click="showModal = true" title="Добавить запрос" />
</template>

<script>
    import axios from 'axios';
    import { defineEmits } from 'vue';

    import BtnPrimarySolid from '../btn/primary/solid/BtnPrimarySolid.vue'

    export default {
        name: 'AddRequestForm',

        components: {
            BtnPrimarySolid
        },

        data() {
            return {
                dealer: '',
                client: '',
                date: '',
                stage: '',
                status: '',
                comment: '',
                offerID: '',
                offers: [],
                showModal: false
            };
        },

        emits: ['requestAdded'],

        mounted() {
            this.fetchOffers();
        },

        methods: {
            async fetchOffers() {
                try {
                    const response = await axios.get('http://localhost:3000/api/offers');
                    this.offers = response.data;
                } catch (error) {
                    console.error('Не удалось получить предложения', error);
                }
            },

            async addRequest() {
                try {
                    await axios.post('http://localhost:3000/api/requests', {
                        dealer: this.dealer,
                        client: this.client,
                        date: this.date,
                        stage: this.stage,
                        status: this.status,
                        comment: this.comment,
                        offerID: this.offerID
                    });
                    this.clearForm();
                    this.closeModal();
                    this.$emit('requestAdded');
                } catch (error) {
                    alert('Не удалось добавить запрос');
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
                this.offerID = '';
            },

            closeModal() {
                this.showModal = false;
            }
        }
    };
</script>