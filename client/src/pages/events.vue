<script setup lang="ts">
import EventsTable from 'src/components/events-table.vue';
</script>

<template>
    <q-page class="q-pa-xl">
        <div class="text-h3 text-weight-bold q-mb-lg">
            Upcoming <span class="text-accent">Crypto</span> Events
        </div>
        <events-table
            title="Example component"
        />
    </q-page>
</template>
