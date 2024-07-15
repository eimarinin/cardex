<template>
    <AsidePanelRequests @filters-updated="updateFilters" />

    <section id="requests" aria-label="Список запросов" class="w-3/4 py-6 px-4">
        <AddRequestForm @requestAdded="fetchRequests" />

        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left">
                <caption class="mb-4">
                    Список запросов: с {{ startIndex }} по {{ endIndex }} из {{ totalRequests }}
                </caption>

                <thead>
                    <tr>
                        <th scope="col" class="pe-3 py-2 align-bottom">Дилер</th>
                        <th scope="col" class="pe-3 py-2 align-bottom">Клиент</th>
                        <th scope="col" class="pe-3 py-2 align-bottom">Дата</th>
                        <th scope="col" class="pe-3 py-2 align-bottom">
                            <div class="flex flex-col gap-2">
                                <select name="Stage" v-model="selectedStageFilter"
                                    class="font-normal rounded border-2 p-1">
                                    <option value="">Без фильтра</option>
                                    <option value="Начальный">Начальный</option>
                                    <option value="В процессе">В процессе</option>
                                    <option value="Завершён">Завершён</option>
                                </select>
                                <p>Этап</p>
                            </div>
                        </th>
                        <th scope="col" class="pe-3 py-2 align-bottom">
                            <div class="flex flex-col gap-2">
                                <select name="Status" v-model="selectedStatusFilter"
                                    class="font-normal rounded border-2 p-1">
                                    <option value="">Без фильтра</option>
                                    <option value="Ожидание">Ожидание</option>
                                    <option value="Одобрено">Одобрено</option>
                                    <option value="Отклонено">Отклонено</option>
                                </select>
                                <p>Статус</p>
                            </div>
                        </th>
                        <th scope="col" class="pe-3 py-2 align-bottom">Комментарий</th>
                        <th scope="col" class="pe-3 py-2 align-bottom">КП</th>
                        <th scope="col" class="pe-3 py-2 align-bottom">Действия</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="request in filteredRequests" :key="request.id" class="border-b-2 hover:bg-gray-100">
                        <td class="pe-3 py-2">{{ request.dealer }}</td>
                        <td class="pe-3 py-2">{{ request.client }}</td>
                        <td class="pe-3 py-2">{{ formatDate(request.date) }}</td>
                        <td class="pe-3 py-2">{{ request.stage }}</td>
                        <td class="pe-3 py-2">{{ request.status }}</td>
                        <td class="pe-3 py-2">{{ request.comment }}</td>
                        <td class="pe-3 py-2">{{ request.device }}</td>
                        <td class="pe-3 py-2">
                            <button @click="openEditModal(request)" type="button"
                                class="rounded p-1 group hover:bg-blue-600">
                                <div class="sr-only">Редактировать запись</div>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor"
                                    class="size-5 text-blue-600 group-hover:text-white">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>
                            </button>
                            <button @click="openDeleteModal(request)" type="button"
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

    <DeleteConfirmationModal :show="showDeleteModal" @confirm="confirmDeleteRequest" @cancel="closeDeleteModal" />

    <!-- Модальное окно редактирования -->
    <div v-if="showEditModal"
        class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
        <div class="bg-white rounded-lg p-8 max-w-md w-full">
            <form @submit.prevent="saveEditRequest" class="flex flex-col gap-2 p-4">
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
    import { formatISO, startOfDay, endOfDay } from 'date-fns';

    import AsidePanelRequests from './base/AsidePanelRequests.vue';
    import AddRequestForm from './form/AddRequestForm.vue';
    import DeleteConfirmationModal from './form/DeleteConfirmationModal.vue';
    import BtnPrimarySolid from './btn/primary/solid/BtnPrimarySolid.vue';

    const requests = ref([]);
    const totalRequests = ref(0);
    const startIndex = ref(0);
    const endIndex = ref(0);
    const showDeleteModal = ref(false);
    const showEditModal = ref(false);
    const requestToDelete = ref(null);
    const requestToEdit = ref(null);

    const selectedStageFilter = ref('');
    const selectedStatusFilter = ref('');

    const dealer = ref('');
    const client = ref('');
    const date = ref('');
    const stage = ref('');
    const status = ref('');
    const comment = ref('');
    const offerID = ref('');
    const offers = ref([]);

    // Local filters state
    const localFilters = ref({
        dateStart: '',
        dateEnd: '',
        dealer: '',
        client: '',
        stage: '',
        status: ''
    });

    // Fetch requests on component mount
    onMounted(fetchRequests);

    // Fetch requests function
    async function fetchRequests() {
        try {
            const response = await axios.get('http://localhost:3000/api/requests');
            requests.value = response.data.map(request => ({
                ...request,
                date: new Date(request.date)
            }));
            totalRequests.value = requests.value.length;
            startIndex.value = 1;
            endIndex.value = totalRequests.value;
        } catch (error) {
            console.error('Failed to fetch requests:', error);
        }
    }

    // Fetch offers function
    async function fetchOffers() {
        try {
            const response = await axios.get('http://localhost:3000/api/offers');
            offers.value = response.data;
        } catch (error) {
            console.error('Failed to fetch offers:', error);
        }
    }

    // Update filters function
    const updateFilters = (filters) => {
        localFilters.value = { ...localFilters.value, ...filters };
    };

    // Computed property for filtered requests
    const filteredRequests = computed(() => {
        let filtered = requests.value;

        // Filter by date range
        if (localFilters.value.dateStart && localFilters.value.dateEnd) {
            const startDate = startOfDay(new Date(localFilters.value.dateStart));
            const endDate = endOfDay(new Date(localFilters.value.dateEnd));
            filtered = filtered.filter(request => {
                const requestDate = new Date(request.date);
                return requestDate >= startDate && requestDate <= endDate;
            });
        }

        // Filter by dealer
        if (localFilters.value.dealer.trim() !== '') {
            filtered = filtered.filter(request =>
                request.dealer.toLowerCase().includes(localFilters.value.dealer.trim().toLowerCase())
            );
        }

        // Filter by client
        if (localFilters.value.client.trim() !== '') {
            filtered = filtered.filter(request =>
                request.client.toLowerCase().includes(localFilters.value.client.trim().toLowerCase())
            );
        }

        // Filter by stage (selectedStageFilter)
        if (selectedStageFilter.value !== '') {
            filtered = filtered.filter(request =>
                request.stage === selectedStageFilter.value
            );
        }

        // Filter by status (selectedStatusFilter)
        if (selectedStatusFilter.value !== '') {
            filtered = filtered.filter(request =>
                request.status === selectedStatusFilter.value
            );
        }
        return filtered;
    });

    function formatDate(date) {
        const formatter = new Intl.DateTimeFormat('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        return formatter.format(date);
    }

    async function deleteRequest(id) {
        try {
            const response = await axios.delete(`http://localhost:3000/api/requests/${id}`);
            await fetchRequests();
        } catch (error) {
            if (error.response) {
                console.error('Server responded with an error:', error.response.data);
            } else if (error.request) {
                console.error('Request was made but no response was received:', error.request);
            } else {
                console.error('Failed to make the request:', error.message);
            }
        }
    }

    function confirmDeleteRequest() {
        if (requestToDelete.value) {
            deleteRequest(requestToDelete.value.id);
        }
        closeDeleteModal();
    }

    function openDeleteModal(request) {
        requestToDelete.value = request;
        showDeleteModal.value = true;
    }

    function closeDeleteModal() {
        requestToDelete.value = null;
        showDeleteModal.value = false;
    }

    function openEditModal(request) {
        requestToEdit.value = request;
        dealer.value = request.dealer;
        client.value = request.client;
        date.value = formatISO(request.date, { representation: 'date' });
        stage.value = request.stage;
        status.value = request.status;
        comment.value = request.comment;
        offerID.value = request.offerID;
        showEditModal.value = true;
    }

    function closeEditModal() {
        requestToEdit.value = null;
        showEditModal.value = false;
    }

    async function saveEditRequest() {
        try {
            const response = await axios.put(`http://localhost:3000/api/requests/${requestToEdit.value.id}`, {
                dealer: dealer.value,
                client: client.value,
                date: date.value,
                stage: stage.value,
                status: status.value,
                comment: comment.value,
                offerID: offerID.value
            });
            await fetchRequests();
        } catch (error) {
            if (error.response) {
                console.error('Server responded with an error:', error.response.data);
            } else if (error.request) {
                console.error('Request was made but no response was received:', error.request);
            } else {
                console.error('Failed to make the request:', error.message);
            }
        }
        closeEditModal();
    }

    onMounted(() => {
        fetchRequests();
        fetchOffers();
    });
</script>