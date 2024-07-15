<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';

    import AsidePanel from './base/AsidePanel.vue'
    import AddRequestForm from './form/AddRequestForm.vue'

    const requests = ref([]);
    const totalRequests = ref(0);
    const startIndex = ref(0);
    const endIndex = ref(0);

    async function fetchRequests() {
        try {
            const response = await axios.get('http://localhost:3000/api/requests');
            requests.value = response.data.map(request => ({
                ...request,
                date: new Date(request.date)  // Преобразуем строку даты в объект Date
            }));
            totalRequests.value = requests.value.length;
            startIndex.value = 1;
            endIndex.value = totalRequests.value;
        } catch (error) {
            console.error('Failed to fetch requests:', error);
        }
    }

    function formatDate(date) {
        const formatter = new Intl.DateTimeFormat('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
        return formatter.format(date);
    }

    async function deleteRequest(id) {
        try {
            const response = await axios.delete(`http://localhost:3000/api/requests/${id}`);
            console.log('Response from server:', response.data); // Выводим ответ от сервера для отладки
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

    onMounted(() => {
        fetchRequests();
    });
</script>

<template>
    <AsidePanel />

    <section id="requests" aria-label="Список запросов" class="w-3/4 py-6 px-4">
        <AddRequestForm />

        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left">
                <caption class="mb-4">
                    Список запросов: с {{ startIndex }} по {{ endIndex }} из {{ totalRequests }}
                </caption>

                <thead>
                    <tr>
                        <th scope="col" class="pe-3 py-2 align-bottom">
                            Дилер
                        </th>
                        <th scope="col" class="pe-3 py-2 align-bottom">
                            Клиент
                        </th>
                        <th scope="col" class="pe-3 py-2 align-bottom">
                            Дата
                        </th>
                        <th scope="col" class="pe-3 py-2 align-bottom">
                            <div class="flex flex-col gap-2">
                                <select name="Model" class="font-normal rounded border-2 p-1">
                                    <option value="Без фильтра" selected>Без фильтра</option>
                                    <option value="1">1</option>
                                    <option value="2">2 </option>
                                </select>
                                <p>
                                    Этап
                                </p>
                            </div>
                        </th>
                        <th scope="col" class="pe-3 py-2 align-bottom">
                            <div class="flex flex-col gap-2">
                                <select name="Model" class="font-normal rounded border-2 p-1">
                                    <option value="Без фильтра" selected>Без фильтра</option>
                                    <option value="1">1</option>
                                    <option value="2">2 </option>
                                </select>
                                <p>
                                    Статус
                                </p>
                            </div>
                        </th>
                        <th scope="col" class="pe-3 py-2 align-bottom">
                            Комментарий
                        </th>
                        <th scope="col" class="pe-3 py-2 align-bottom">
                            КП
                        </th>
                        <th scope="col" class="pe-3 py-2 align-bottom">
                            Удалить
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="request in requests" :key="request.id" class="border-b-2 hover:bg-gray-100">
                        <td class="pe-3 py-2">{{ request.dealer }}</td>
                        <td class="pe-3 py-2">{{ request.client }}</td>
                        <td class="pe-3 py-2">{{ formatDate(request.date) }}</td>
                        <td class="pe-3 py-2">{{ request.stage }}</td>
                        <td class="pe-3 py-2">{{ request.status }}</td>
                        <td class="pe-3 py-2">{{ request.comment }}</td>
                        <td class="pe-3 py-2">{{ request.kp }}</td>
                        <td class="pe-3 py-2">
                            <button @click="deleteRequest(request.id)" type="button"
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
</template>