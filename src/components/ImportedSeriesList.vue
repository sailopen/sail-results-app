<script setup lang="ts">
import { ref } from 'vue';

// const selected = ref<HTMLInputElement>();
const importList = ref<
  {
    file: File;
    series?: Record<string, string>;
  }[]
>([]);
// const fileList = ref<FileList>();
</script>

<template>
  <table class="w-full table-auto">
    <thead>
      <tr class="h4 border-b">
        <th>Filename</th>
        <th>Date</th>
        <th>Size</th>
        <th>Title</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="importList.length === 0">
        <td colspan="4" class="h3 text-center">
          <div class="border-2 border-slate-200">No entries</div>
        </td>
      </tr>
      <tr v-for="importEntry in importList" :key="importEntry.file.name">
        <td>{{ importEntry.file.name }}</td>
        <td>{{ importEntry.file.lastModified }}</td>
        <td>{{ importEntry.file.size }}</td>
        <td>{{ importEntry.series?.title }}</td>
      </tr>
    </tbody>
  </table>
</template>
