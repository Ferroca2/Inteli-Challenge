<script setup lang="ts">
import { defineProps } from 'vue';

interface Analyst {
    name: string;
    reputation: string;
}

defineProps<Analyst>();
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
                    {{ reputation }}
                </div>
            </q-card-section>

            <q-card-section>
                <q-btn
                    color="accent"
                    label="Recomend"
                    class="q-ma-sm"
                />
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
