<script setup lang="ts">
import { ref } from 'vue';
import { addSeriesToCache } from '../results/store';
import { importSeriesFromBlw } from '../sailwave/store';
import ImportedSeriesList from './ImportedSeriesList.vue';
import FileUpload from './FileUpload.vue';
import { SailwaveSeries } from '../../../sail-results/esm/import/sailwave-blw';

import { formatIsoDate } from '../ui/filters';

type ImportFile = {
  // A file selected for upload.
  file: File;
  // The file contents.
  text?: string;
  // Parsed file contents.
  series?: SailwaveSeries;
};

// The list of files to import.
const importList = ref<ImportFile[]>([]);

const countCompetitors = (series: SailwaveSeries | null): number | null => {
  return series ? Object.keys(series.competitors).length : null;
};

const countRaces = (series: SailwaveSeries): number | null => {
  return series ? Object.keys(series.races).length : null;
};

const countResults = (series: SailwaveSeries): number | null => {
  return series ? Object.keys(series.results).length : null;
};

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
        importList.value[i].series = importSeriesFromBlw(text);
      }
    };

    // Load the file, triggering the event handler when done.
    reader.readAsBinaryString(file);
  });
};

const importSelectedFile = (file: ImportFile) => {
  // The file should be loaded by now, abort if not.
  if (!file.text) return;

  const series = importSeriesFromBlw(file.text);
  addSeriesToCache(series);
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
              :disabled="importEntry.series == null"
              class="h-10 px-5 m-2 text-white transition-colors duration-150 bg-slate-500 rounded-lg focus:shadow-outline hover:bg-slate-600"
            >
              Import
            </button>
          </td>
        </tr>
        <tr class="border-b">
          <td class="text-left">{{ importEntry.series?.globals.serevent }}</td>
          <!-- td>{{ importEntry.series?.globals.sereventeid }}</td -->
          <td>{{ countCompetitors(importEntry.series) }}</td>
          <td>{{ countRaces(importEntry.series) }}</td>
          <td>{{ countResults(importEntry.series) }}</td>
        </tr>
      </template>
    </tbody>
  </table>

  <h2 class="h2">Imported series</h2>

  <ImportedSeriesList></ImportedSeriesList>
</template>
