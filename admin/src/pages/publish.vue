<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useQuasar } from 'quasar';
import useError from 'src/hooks/useError';
import { addDoc, collection, getFirestore, updateDoc } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getStorage, getDownloadURL } from 'firebase/storage';

const $q = useQuasar();

const error = useError();

const researchData = reactive({
    name: '',
    description: '',
});

const loading = ref(false);

const researchFile = ref();
const researchImageFile = ref();
const researchImageFileUrl = ref('');


const imgFilePickerChanged = () => {
    researchImageFileUrl.value = researchImageFile.value
        ? URL.createObjectURL(researchImageFile.value)
        : '';
};

async function createResearch () {
    loading.value = true;

    if (!researchImageFile.value) return;

    try{
        console.log(researchImageFile.value);

        const researchRef = await addDoc(
            collection(getFirestore(), `researches`),
            {
                name: researchData.name,
                description: researchData.description,
            }
        );

        const imageExtension = researchImageFile.value.type.split('/')[1];
        const imagesRef = storageRef(
            getStorage(),
            `public/researches/images/${researchRef.id}.${imageExtension}`
        );
        const fileExtension = researchFile.value.type.split('/')[1];
        const filesRef = storageRef(
            getStorage(),
            `public/researches/files/${researchRef.id}.${fileExtension}`
        );

        const uploadImage = await uploadBytes(imagesRef, researchImageFile.value);
        const uploadFile = await uploadBytes(filesRef, researchFile.value);

        const imageUrl = await getDownloadURL(uploadImage.ref);
        const fileUrl = await getDownloadURL(uploadFile.ref);

        updateDoc(researchRef, { picture: imageUrl, file: fileUrl });

        researchData.name = '';
        researchData.description = '';
        researchImageFileUrl.value = '';
        researchImageFile.value = undefined;
        researchFile.value = undefined;

        $q.notify({
            type: 'positive',
            message: 'Pulished',
        });

        loading.value = false;
    }
    catch (err) {
        error(err);
    }
    finally {
        loading.value = false;
    }

}

</script>

<template>
    <q-page class="q-pa-xl">
        <div class="title text-h3 text-weight-bold q-mb-lg">
            Publish <span class="text-accent">researches</span>
        </div>
        <div class="form column">
            <q-form
                class="form__contents"
                @submit="createResearch"
            >
                <q-img
                    v-if="researchImageFileUrl"
                    :src="researchImageFileUrl"
                    ratio="1"
                    width="100%"
                    :style="{ minHeight: '120px', maxHeight: '256px' }"
                    class="rounded-borders"
                />
                <q-file
                    v-model="researchImageFile"
                    clearable
                    label="Selecione uma foto"
                    filled
                    accept=".jpg, image/*"
                    class="self-end q-my-lg"
                    bg-color="accent"
                    @update:model-value="imgFilePickerChanged"
                />
                <q-input
                    v-model="researchData.name"
                    filled
                    class="form__inputs"
                    label="Name"
                    placeholder="Ex: December research"
                    color="accent"
                />
                <q-input
                    v-model="researchData.description"
                    filled
                    class="form__inputs"
                    label="Description"
                    placeholder="Ex: December research"
                    color="accent"
                    type="textarea"
                />
                <q-file
                    v-model="researchFile"
                    clearable
                    label="Selecione um arquivo"
                    filled
                    class="self-end q-my-lg"
                    bg-color="accent"
                />
                <q-btn
                    type="submit"
                    no-caps
                    color="accent"
                    class="form__btn"
                    :loading="loading"
                >
                    Publish
                    <template #loading>
                        <q-spinner-bars
                            color="white"
                            size="1.5rem"
                        />
                    </template>
                </q-btn>
            </q-form>
        </div>
    </q-page>
</template>

<style scoped lang="scss">
.form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    &__contents {
        width: 30%;
    }
    &__inputs {
        margin-bottom: 2rem;
    }
    &__image {
        margin-bottom: 2rem;
        width: 100%;
    }
    &__btn {
        width: 100%;
        font-size: 1.2rem;
    }
}
.title{
    text-align: center;
}
</style>
