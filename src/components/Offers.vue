<template>
    <AsidePanelOffers @filters-updated="updateFilters" />

    <section id="offers" aria-label="Список приборов" class="w-3/4 py-6 px-4">
        <AddOfferForm @offerAdded="fetchOffers" />

        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left">
                <caption class="mb-4">
                    Список приборов: с {{ startIndex }} по {{ endIndex }} из {{ totalOffers }}
                </caption>

                <thead>
                    <tr>
                        <th scope="col" class="pe-3 py-2 align-bottom">Прибор</th>
                        <th scope="col" class="pe-3 py-2 align-bottom">Количество</th>
                        <th scope="col" class="pe-3 py-2 align-bottom">Комментарий</th>
                        <th scope="col" class="pe-3 py-2 align-bottom">Действия</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="offer in filteredOffers" :key="offer.id" class="border-b-2 hover:bg-gray-100">
                        <td class="pe-3 py-2">{{ offer.device }}</td>
                        <td class="pe-3 py-2">{{ offer.quantity }}</td>
                        <td class="pe-3 py-2">{{ offer.comment }}</td>
                        <td class="pe-3 py-2">
                            <button @click="openEditModal(offer)" type="button"
                                class="rounded p-1 group hover:bg-blue-600">
                                <div class="sr-only">Редактировать запись</div>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor"
                                    class="size-5 text-blue-600 group-hover:text-white">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>
                            </button>
                            <button @click="openDeleteModal(offer)" type="button"
                                class="rounded p-1 group hover:bg-red-600">
                                <div class="sr-only">Удалить запись</div>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor"
                                    class="size-5 text-red-600 group-hover:text-white">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>

    <DeleteConfirmationModal :show="showDeleteModal" @confirm="confirmDeleteOffer" @cancel="closeDeleteModal" />

    <!-- Модальное окно редактирования -->
    <div v-if="showEditModal"
        class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
        <div class="bg-white rounded-lg p-8 max-w-md w-full">
            <form @submit.prevent="saveEditOffer" class="flex flex-col gap-2 p-4">
                <input name="Device" v-model="device" type="text" placeholder="Прибор" required
                    class="rounded border-2 p-2" />
                <input name="Quantity" v-model="quantity" type="text" placeholder="Количество" required
                    class="rounded border-2 p-2" />

                <textarea name="Comment" v-model="comment" placeholder="Комментарий"
                    class="rounded border-2 p-2"></textarea>
                <BtnPrimarySolid type="submit" title="Сохранить изменения" />
                <button type="button" @click="closeEditModal"
                    class="bg-gray-300 text-gray-800 rounded p-2 mt-2">Закрыть</button>
            </form>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, computed } from 'vue';
    import axios from 'axios';

    import AsidePanelOffers from './base/AsidePanelOffers.vue';
    import AddOfferForm from './form/AddOfferForm.vue';
    import DeleteConfirmationModal from './form/DeleteConfirmationModal.vue';
    import BtnPrimarySolid from './btn/primary/solid/BtnPrimarySolid.vue';

    const offers = ref([]);
    const totalOffers = ref(0);
    const startIndex = ref(0);
    const endIndex = ref(0);
    const showDeleteModal = ref(false);
    const showEditModal = ref(false);
    const offerToDelete = ref(null);
    const offerToEdit = ref(null);

    const device = ref('');
    const quantity = ref('');
    const comment = ref('');

    // Local filters state
    const localFilters = ref({
        device: '',
        quantity: '',
    });

    // Fetch offers on component mount
    onMounted(fetchOffers);

    // Fetch offers function
    async function fetchOffers() {
        try {
            const response = await axios.get('http://localhost:3000/api/offers');
            offers.value = response.data.map(offer => ({
                ...offer
            }));
            totalOffers.value = offers.value.length;
            startIndex.value = 1;
            endIndex.value = totalOffers.value;
        } catch (error) {
            console.error('Failed to fetch offers:', error);
        }
    }

    // Update filters function
    const updateFilters = (filters) => {
        localFilters.value = { ...localFilters.value, ...filters };
    };

    // Computed property for filtered offers
    const filteredOffers = computed(() => {
        let filtered = offers.value;

        // Filter by device
        if (localFilters.value.device.trim() !== '') {
            filtered = filtered.filter(offer =>
                offer.device.toLowerCase().includes(localFilters.value.device.trim().toLowerCase())
            );
        }

        // Filter by quantity
        if (localFilters.value.quantity.trim() !== '') {
            filtered = filtered.filter(offer =>
                offer.quantity.toLowerCase().includes(localFilters.value.quantity.trim().toLowerCase())
            );
        }

        return filtered;
    });

    async function deleteOffer(id) {
        try {
            const response = await axios.delete(`http://localhost:3000/api/offers/${id}`);
            await fetchOffers();
        } catch (error) {
            if (error.response) {
                console.error('Server responded with an error:', error.response.data);
            } else if (error.offer) {
                console.error('Offer was made but no response was received:', error.offer);
            } else {
                console.error('Failed to make the offer:', error.message);
            }
        }
    }

    function confirmDeleteOffer() {
        if (offerToDelete.value) {
            deleteOffer(offerToDelete.value.id);
        }
        closeDeleteModal();
    }

    function openDeleteModal(offer) {
        offerToDelete.value = offer;
        showDeleteModal.value = true;
    }

    function closeDeleteModal() {
        offerToDelete.value = null;
        showDeleteModal.value = false;
    }

    function openEditModal(offer) {
        offerToEdit.value = offer;
        device.value = offer.device;
        quantity.value = offer.quantity;
        comment.value = offer.comment;
        showEditModal.value = true;
    }

    function closeEditModal() {
        offerToEdit.value = null;
        showEditModal.value = false;
    }

    async function saveEditOffer() {
        try {
            const response = await axios.put(`http://localhost:3000/api/offers/${offerToEdit.value.id}`, {
                device: device.value,
                quantity: quantity.value,
                comment: comment.value
            });
            await fetchOffers();
        } catch (error) {
            if (error.response) {
                console.error('Server responded with an error:', error.response.data);
            } else if (error.offer) {
                console.error('Offer was made but no response was received:', error.offer);
            } else {
                console.error('Failed to make the offer:', error.message);
            }
        }
        closeEditModal();
    }

    onMounted(() => {
        fetchOffers();
    });
</script>