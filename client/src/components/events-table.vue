<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { eventsApi } from 'boot/axios';
import { QTable, QPagination } from 'quasar';
import {APIResponse} from 'utils/types';

const pagination = ref({
    sortBy: 'desc',
    descending: false,
    page: 1,
    rowsPerPage: 16,
    rowsNumber: 16,
});

const dataAPI = ref<APIResponse[]>();

const pagesNumber = ref(0);

const loading = ref(false);

watch(() => pagination.value.page, async () => {
    loading.value = true;
    const { data } = await eventsApi.get('/', {
        params: {
            page: pagination.value.page,
        },
    });
    dataAPI.value = data.body;
    pagesNumber.value = data._metadata.page_count;
    loading.value = false;
    console.log(dataAPI.value, formatted.value);
}, { immediate: true });

const formatted = computed(() => {
    return dataAPI.value?.map(row => ({
        token: row.coins[0].symbol,
        description: row.title.en,
        eventType: row.categories[0].name,
        date: new Date(row.date_event).toLocaleDateString(),
    })) || [];
});


const columns = [
    {
        name: 'token',
        required: true,
        label: 'Token',
        align: 'left',
        field: 'token',
        sortable: true,
    },
    { name: 'description', align: 'center', label: 'Description', field: 'description', sortable: true },
    { name: 'event-type', label: 'Event type', field: 'eventType', sortable: true },
    { name: 'date', label: 'Date', field: 'date' },
];

</script>

<template>
    <div v-if="formatted">
        <q-table
            v-model:pagination="pagination"
            :rows="formatted"
            :columns="columns"
            row-key="token"
            dark
            color="accent"
            class="text-subtitle1"
            hide-pagination
            :loading="loading"
        />
        <div class="row justify-center q-mt-md">
            <q-pagination
                v-model="pagination.page"
                color="accent"
                :max="pagesNumber"
                size="sm"
            />
        </div>
    </div>
</template>
