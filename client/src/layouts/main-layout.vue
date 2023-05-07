<script setup lang="ts">
import { useQuasar } from 'quasar';

const $q = useQuasar();

$q.dark.set(true);

</script>

<template>
    <q-layout view="hHh lpR fFf">
        <q-header
            reveal
            class="bg-primary text-white q-pa-sm"
            height-hint="98"
        >
            <q-toolbar>
                <q-toolbar-title>
                    <q-avatar>
                        <q-img src="../assets/logo.png" />
                    </q-avatar>
                    Crypto Brief
                </q-toolbar-title>

                <q-btn
                    flat
                    text-color="accent"
                    to="/customers/news"
                    label="Today news"
                    no-caps
                />
                <q-btn
                    flat
                    text-color="accent"
                    to="/customers/analysts"
                    label="Analysts"
                    no-caps
                />
                <q-btn
                    flat
                    text-color="accent"
                    to="/events"
                    label="Events"
                    no-caps
                />
                <q-space />
                <q-space />
                <q-space />
                <q-space />
                <q-space />
            </q-toolbar>
        </q-header>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>
