<script setup lang="ts">
import AnalystCard from 'components/analyst-card.vue';
import { onMounted, ref } from 'vue';
import { getFirestore, collection, CollectionReference, getDocs } from 'firebase/firestore';


interface Analyst {
    name: string;
    votes: number;
    address: string;
}

const analysts = ref<Analyst[]>();
onMounted(async () => {
    const analystsRef = collection(getFirestore(), `Analysts`) as CollectionReference<Analyst>;
    const analystsSnap = await getDocs(analystsRef);
    analysts.value = analystsSnap.docs.map(doc => doc.data());
});

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
                v-for="a in analysts"
                :key="a.name"
                :name="a.name"
                :reputation="a.votes"
                :address="a.address"
            />
        </div>
    </q-page>
</template>
