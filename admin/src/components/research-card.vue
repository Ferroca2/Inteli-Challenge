<script setup lang="ts">
import axios, { AxiosResponse } from 'axios';
import { QCard, QImg, QCardSection, QBtn, QRating } from 'quasar';
import { ref, defineProps } from 'vue';

interface Props {
    title: string;
    image: string;
    description: string;
    file: string;
}

const props = defineProps<Props>();

function forceFileDownload(response: AxiosResponse, title: string) {
    console.log(title);
    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${title}`);
    document.body.appendChild(link);
    link.click();
}

async function downloadFile() {
    const response = await axios.get(props.file, {
        responseType: 'blob',
    });
    forceFileDownload(response, props.title);
}


const stars = ref(0);

</script>


<template>
    <q-card
        dark
        flat
        class="my-card bg-transparent"
    >
        <q-img
            :src="image"
            height="150px"
        />

        <q-card-section>
            <q-btn
                fab
                color="primary"
                text-color="accent"
                icon="download"
                class="absolute"
                style="top: 0; right: 12px; transform: translateY(-50%);"
                @click="downloadFile"
            />

            <div class="row no-wrap items-center">
                <div class="col text-h6 ellipsis">
                    {{ title }}
                </div>
            </div>

            <q-rating
                v-model="stars"
                :max="5"
                size="20px"
                color="accent"
            />
        </q-card-section>

        <q-card-section class="q-pt-none">
            <div class="text-caption text-grey">
                {{ description }}
            </div>
        </q-card-section>
    </q-card>
</template>

<style scoped lang="scss">
.my-card{
    width: 100%;
    max-width: 300px
}
</style>
