<template>
  <div>
    <input
      :accept="props.accept"
      @change="handleSelectFiles"
      :multiple="props.multiple"
      ref="selected"
      type="file"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  (name: 'selected', payload: { files: File[] }): void;
}>();

const props = defineProps<{
  accept?: string;
  multiple?: boolean;
}>();

const selected = ref<HTMLInputElement>();

const handleSelectFiles = async () => {
  // Give up if the list is null.
  if (selected.value?.files == null) return;

  // Convert the FileList to an array for easy iteration and emit it.
  const files = Array(selected.value.files.length);
  for (let i = 0; i < selected.value.files.length; ++i) {
    files[i] = selected.value.files[i];
  }

  emit('selected', { files });
};
</script>
