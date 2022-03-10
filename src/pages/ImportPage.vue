<script setup lang="ts">
// Types.
import type { SailwaveSeries } from '../../../sail-results/esm/import/sailwave-blw';

// Vue.
import { ref, computed } from 'vue';

// ux.
import FileUpload from '../ux/FileUpload.vue';
import { formatIsoDate } from '../ux/filters';

// Store.
import { importSeriesFromBlw } from '../results/store';

const importedSeries: SailwaveSeries[] = [];

type ImportFile = {
  // A file selected for upload.
  file: File;
  // The file contents.
  text?: string;
  // Parsed file contents.
  seriesId?: number;
};

// The list of files to import.
const importList = ref<ImportFile[]>([]);

// Triggered when the user selects files from the input dialog.
const handleSelectFiles = async ({ files }: { files: File[] }) => {
  // Create a list with an entry for each file.
  importList.value = files.map((file) => ({ file }));

  // Load each selected file.
  files.forEach((file, i) => {
    const reader = new FileReader();

    // Set up the onload event handler.
    reader.onload = function ({ target }) {
      if (target == null) return;
      // Parse the loaded file content.
      if (target.result) {
        // Save the file contents and the parsed result to the array entry.
        const text = target.result.toString();
        importList.value[i].text = text;
        importList.value[i].seriesId = importedSeries.length;
        importedSeries.push(importSeriesFromBlw(text));
      }
    };

    // Load the file, triggering the event handler when done.
    reader.readAsBinaryString(file);
  });
};

const importSelectedFile = (importFile: ImportFile) => {
  // The file should be loaded by now, abort if not.
  if (importFile.seriesId == null) return;
  console.log(importedSeries);
  console.log(importedSeries[importFile.seriesId]);
};

type ImportedSeriesInfo = {
  name?: string;
  competitors?: unknown[];
  races?: unknown[];
};

const getImportedSeries = (seriesId?: number): ImportedSeriesInfo => {
  if (seriesId == null) {
    return {};
  }
  const series = importedSeries[seriesId];
  return {
    name: series.globals.serevent,
    competitors: Object.entries(series.competitors),
    races: Object.entries(series.races),
  };
};

</script>

<template>
  <h1 class="h1">Import sailwave files</h1>

  <section>
    <h2 class="h2">Select files</h2>
    <label for="formFile" class="form-label block"
      >Select files for import</label
    >
    <FileUpload @selected="handleSelectFiles" accept=".blw" multiple />
  </section>

  <table class="w-full table-auto text-center">
    <thead>
      <tr class="h4">
        <th class="text-left">Filename</th>
        <th>Date</th>
        <th>Size</th>
      </tr>
      <tr class="h4 border-b">
        <th class="text-left">Title</th>
        <th>Entries</th>
        <th>Races</th>
        <th>Results</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="importList.length === 0">
        <td colspan="4" class="h3 text-center">
          <div class="border-2 border-slate-200">No entries</div>
        </td>
      </tr>
      <template v-for="importEntry in importList" :key="importEntry.file.name">
        <tr>
          <td class="text-left">{{ importEntry.file.name }}</td>
          <td>{{ formatIsoDate(importEntry.file.lastModified) }}</td>
          <td>{{ importEntry.file.size }}</td>

          <td></td>
          <td rowspan="2">
            <button
              @click="importSelectedFile(importEntry)"
              :disabled="importEntry.seriesId == null"
              class="h-10 px-5 m-2 text-white transition-colors duration-150 bg-slate-500 rounded-lg focus:shadow-outline hover:bg-slate-600"
            >
              Import
            </button>
          </td>
        </tr>
        <tr v-if="importEntry.seriesId !== null" class="border-b">
          <td class="text-left">{{ getImportedSeries(importEntry.seriesId).name }}</td>
          <!-- td>{{ importEntry.series?.globals.sereventeid }}</td -->
          <td>{{ getImportedSeries(importEntry.seriesId).competitors?.length }}</td>
          <td>{{ getImportedSeries(importEntry.seriesId).races?.length }}</td>
        </tr>
        <tr v-else class="border-b">
          <td class="text-left">Not loaded! {{ importEntry.seriesId }}</td>
        </tr>      </template>
    </tbody>
  </table>
</template>
