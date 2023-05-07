<script setup lang="ts">
import { useQuasar } from 'quasar';

const $q = useQuasar();

$q.dark.set(true);

</script>

<template>
    <q-layout view="hHh lpR fFf">
        <q-header
            reveal
            class="bg-primary text-white q-pt-md"
            height-hint="98"
        >
            <q-toolbar>
                <q-toolbar-title>
                    <q-avatar>
                        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
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

            <!-- <q-tabs
                align="left"
                class="text-accent bg-secondary"
            >
                <q-route-tab
                    to="/events"
                    label="List"
                />
                <q-route-tab
                    to="/events"
                    label="Calendar"
                />
                <q-route-tab
                    to="/events"
                    label="Grid"
                />
            </q-tabs> -->
        </q-header>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>
