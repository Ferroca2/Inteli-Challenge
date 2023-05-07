<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ResearchCard from 'src/components/research-card.vue';
import { getDocs, collection, getFirestore, CollectionReference } from 'firebase/firestore';
import { Research } from 'utils/types';

const researches = ref<Research[]>([]);

onMounted(async () => {
    const researchesRef = collection(getFirestore(), `researches`) as CollectionReference<Research>;
    const researchesSnap = await getDocs(researchesRef);
    researches.value = researchesSnap.docs.map(doc => doc.data());
    console.log(researches.value);
});
</script>

<template>
    <q-page class="q-pa-xl">
        <div class="text-h3 text-weight-bold q-mb-lg">
            Last monthly <span class="text-accent">researches</span>
        </div>
        <div class="row">
            <research-card
                v-for="(research, index) in researches"
                :key="index"
                class=".col q-ma-md"
                :image="research.picture"
                :title="research.name"
                :description="research.description"
                :file="research.file"
            />
        </div>
    </q-page>
</template>
