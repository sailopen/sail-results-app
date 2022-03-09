<script setup lang="ts">
import { version } from '../../sail-results/esm';
</script>

<template>
  <header class="py-1 px-2 bg-slate-200 text-slate-900">Site header</header>
  <section class="py-1 px-2 text-slate-700">
    <router-view></router-view>
  </section>
  <footer class="py-1 px-2 border-t border-slate-300 text-slate-500">
    Site footer Version: {{ version }}
  </footer>
</template>
