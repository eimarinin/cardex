<template>
    <div v-if="showModal"
        class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
        <div class="bg-white rounded-lg p-8 max-w-md w-full">
            <form @submit.prevent="addOffer" class="flex flex-col gap-2 p-4">
                <input name="Device" v-model="device" type="text" placeholder="Прибор" required
                    class="rounded border-2 p-2" />
                <input name="Quantity" v-model="quantity" type="number" min="0" placeholder="Количество" required
                    class="rounded border-2 p-2" />

                <textarea name="Comment" v-model="comment" placeholder="Комментарий"
                    class="rounded border-2 p-2"></textarea>
                <BtnPrimarySolid type="submit" title="Добавить прибор" />
                <button type="button" @click="closeModal"
                    class="bg-gray-300 text-gray-800 rounded p-2 mt-2">Закрыть</button>
            </form>
        </div>
    </div>

    <BtnPrimarySolid type="button" @click="showModal = true" title="Добавить прибор" />
</template>

<script>
    import axios from 'axios';
    import { defineEmits } from 'vue';

    import BtnPrimarySolid from '../btn/primary/solid/BtnPrimarySolid.vue'

    export default {
        name: 'AddOfferForm',

        components: {
            BtnPrimarySolid
        },

        data() {
            return {
                device: '',
                quantity: '',
                comment: '',
                showModal: false
            };
        },

        emits: ['offerAdded'],

        methods: {
            async addOffer() {
                try {
                    await axios.post('http://localhost:3000/api/offers', {
                        device: this.device,
                        quantity: this.quantity,
                        comment: this.comment
                    });
                    this.clearForm();
                    this.closeModal();
                    this.$emit('offerAdded');
                } catch (error) {
                    alert('Не удалось добавить прибор');
                    console.error(error);
                }
            },

            clearForm() {
                this.device = '';
                this.quantity = '';
                this.comment = '';
            },

            closeModal() {
                this.showModal = false;
            }
        }
    };
</script>