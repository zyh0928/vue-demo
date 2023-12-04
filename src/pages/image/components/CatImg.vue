<script setup lang="ts">
import { getList } from "$/cat";

import InfiniteBox, { type InfiniteLoad } from "./InfiniteBox.vue";

interface Props {
  loading?: boolean;
}

withDefaults(defineProps<Props>(), {});

const emit = defineEmits<{
  open: [src?: string];
  "update:loading": [value: boolean];
}>();

const urls = ref<string[]>([]);
const loaded = ref(!1);

const getCats = async () => {
  emit("update:loading", !0);
  const cats = (await getList()).map(({ url }: Recordable<string>) => url);
  emit("update:loading", !1);

  if (!cats.length) {
    loaded.value = !1;
    return;
  }

  urls.value.push(...cats);

  if (!loaded.value) {
    loaded.value = !0;
  }
};

const load: InfiniteLoad = async ({ done }) => {
  if (loaded.value) {
    await getCats();
  }

  done("empty");
};

onMounted(getCats);
</script>

<template>
  <infinite-box :urls="urls" @load="load" @open="emit('open', $event)" />
</template>
