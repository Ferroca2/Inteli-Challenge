import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { defineStore } from 'pinia';
import {
    getAuth,
    onIdTokenChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
} from 'firebase/auth';

export interface LoginOptions {
    email: string;
    password: string;
}

export interface RegisterOptions {
    name: string;
    email: string;
    password: string;
}

export const useSessionStore = defineStore('session', () => {
    const router = useRouter();

    const user = ref<User | null>(null);
    const loading = ref(true);


    onIdTokenChanged(getAuth(), async currentUser => {
        loading.value = false;
        user.value = currentUser;
    });

    return {
        user,
        loading,
        async login({ email, password }: LoginOptions) {
            await signInWithEmailAndPassword(getAuth(), email, password);

            await router.replace('/admin');
        },
        async logout() {
            await signOut(getAuth());
            await router.replace('/');
        },
    };
});
