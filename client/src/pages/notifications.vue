<script setup lang="ts">
import AnalystCard from 'components/analyst-card.vue';
</script>

<template>
    <q-page class="q-pa-xl">
        <div class="text-h3 text-weight-bold q-mb-lg text-center">
            Our <span class="text-accent">top analysts</span>
        </div>
        <div
            class="column justify-center items-center full-width"
        >
            <analyst-card
                name="Ferroca"
                reputation="5"
            />
            <analyst-card
                name="Lisa"
                reputation="3"
            />
            <analyst-card
                name="Filé"
                reputation="2"
            />
        </div>
    </q-page>
</template>
