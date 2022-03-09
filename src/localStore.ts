import { ref } from 'vue';

export const localStorageUsed = ref(window.localStorage.length);

const update = () => {
  localStorageUsed.value = window.localStorage.length;
};

const localStorage = {
  save: (key: string, text: string) => {
    window.localStorage.setItem(key, text);
    update();
  },
};

export const saveBlw = (name: string, text: string) => {
  const blwIndex = JSON.parse(
    window.localStorage.getItem('sail-results-blw-files') || '{}'
  );
  const key = `sail-results-blw-file-${name}`;
  blwIndex[name] = key;
  localStorage.save(key, text);
};

window.addEventListener('storage', update);
