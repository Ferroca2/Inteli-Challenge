<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { newsApi } from 'boot/axios';
import NewsCard from 'components/news-card.vue';

interface News {
    headline: string;
    resume: string;
}

const loading = ref<boolean>(false);

const news = ref<News[]>();

onMounted(async () => {
    loading.value = true;
    const { data } = await newsApi.get('/');
    news.value = data;
    loading.value = false;
});
</script>

<template>
    <q-page class="q-pa-xl">
        <div class="text-h3 text-weight-bold q-mb-lg">
            Last daily <span class="text-accent">news</span>
        </div>
        <div class="row justify-center full-width">
            <q-spinner
                v-if="loading"
                color="accent"
                size="50px"
            />
            <news-card
                v-for="n in news"
                :key="n.headline"
                :headline="n.headline"
                :resume="n.resume"
            />
        </div>
    </q-page>
</template>
