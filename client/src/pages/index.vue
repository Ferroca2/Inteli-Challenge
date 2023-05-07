<script setup lang="ts">
import { reactive, ref } from 'vue';
import {
    mdiAccountCircle,
    mdiLock,
} from '@quasar/extras/mdi-v6';
import { useSessionStore } from 'stores/session';
import useError  from 'src/hooks/useError';

const session = useSessionStore();

const error = useError();

const data = reactive({
    email: '',
    password: '',
});

const loading = ref(false);

async function login() {
    loading.value = true;
    try {
        await session.login(data);
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
    <q-page class="column justify-center align-center full-height q-pa-xl">
        <div class="text-center text-h3 text-weight-bold q-mb-lg">
            Crypto <span class="text-accent">Brief</span>
        </div>
        <div class="row justify-center align-center">
            <q-form
                class="form"
                @submit.prevent="login"
            >
                <div class="form__contents column">
                    <q-input
                        v-model="data.email"
                        label="Email"
                        type="email"
                        color="accent"
                    >
                        <template #before>
                            <q-icon :name="mdiAccountCircle" />
                        </template>
                    </q-input>
                    <q-input
                        v-model="data.password"
                        label="Password"
                        type="password"
                        color="accent"
                    >
                        <template #before>
                            <q-icon :name="mdiLock" />
                        </template>
                    </q-input>
                </div>
                <q-btn
                    class="form__submit"
                    no-caps
                    rounded
                    color="accent"
                    type="submit"
                    :loading="loading"
                >
                    Login
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
    max-width: 500px;
    width: 80%;

    &__contents {
        gap: 2rem;
        margin-top: 2rem;
    }

    &__submit {
        margin-top: 2rem;
        width: 100%;
        height: 50px;

        font-size: 13pt;
    }
}
</style>
