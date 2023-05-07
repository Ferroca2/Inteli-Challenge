<script setup lang="ts">
import { defineProps } from 'vue';

interface News {
    headline: string;
    resume: string;
}

defineProps<News>();
</script>

<template>
    <q-card
        dark
        bordered
        class="my-card .col bg-grey-10 q-ma-md"
    >
        <q-card-section>
            <div class="text-h6">
                {{ headline }}
            </div>
        </q-card-section>

        <q-separator
            dark
            inset
        />

        <q-card-section>
            {{ resume }}
        </q-card-section>
    </q-card>
</template>


<style scoped lang="scss">
.my-card{
    width: 100%;
    max-width: 500px;
    height: 100%;
    max-height: 500px;
}
</style>
