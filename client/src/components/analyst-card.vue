<script setup lang="ts">
import { doc, getFirestore, setDoc } from '@firebase/firestore';
import { harthosApi } from 'boot/axios';
import { defineProps, ref } from 'vue';

interface Analyst {
    name: string;
    reputation: number;
    address: string;
}

const props = defineProps<Analyst>();

const editedVote =ref(props.reputation);

const loading = ref<boolean>(false);


async function vote(address: string) {
    loading.value = true;
    try{
        await harthosApi.post('/', {
            address,
        });

        editedVote.value++;

        const analystsRef = doc(getFirestore(), `Analysts/${address}`);
        await setDoc(analystsRef, {
            votes: editedVote.value,
        }, { merge: true });
    } catch (err) {
        console.log(err);
    }
    finally {
        loading.value = false;
    }
}
</script>

<template>
    <q-card
        dark
        bordered
        class="my-card .col bg-grey-10 q-ma-md"
    >
        <q-card-section
            horizontal
            class="justify-between items-centers"
        >
            <q-card-section horizontal>
                <q-card-section>
                    <q-avatar>
                        <img src="../assets/profile.png">
                    </q-avatar>
                </q-card-section>
                <q-card-section class="column justify-center">
                    <div class="text-caption">
                        Analyst
                    </div>
                    <div class="text-h6 text-center">
                        {{ name }}
                    </div>
                </q-card-section>
            </q-card-section>


            <q-card-section class="column justify-center items-center">
                <div class="text-caption">
                    Reputation
                </div>
                <div class="text-h6">
                    {{ editedVote }}
                </div>
            </q-card-section>

            <q-card-section>
                <q-btn
                    color="accent"
                    class="q-ma-sm"
                    :loading="loading"
                    @click="vote(address)"
                >
                    Recommend
                    <template #loading>
                        <q-spinner
                            color="white"
                            size="20px"
                        />
                    </template>
                </q-btn>
            </q-card-section>
        </q-card-section>
    </q-card>
</template>


<style scoped lang="scss">
.my-card{
    width: 100%;
    max-width: 700px;
    height: 100%;
    max-height: 500px;
}
</style>
