<script setup lang="ts">
import { getList } from "$/dog";

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

const getDogs = async () => {
  emit("update:loading", !0);
  const dogs = await getList();
  emit("update:loading", !1);

  if (!dogs.length) {
    loaded.value = !1;
    return;
  }

  urls.value.push(...dogs);

  if (!loaded.value) {
    loaded.value = !0;
  }
};

const load: InfiniteLoad = async ({ done }) => {
  if (loaded.value) {
    await getDogs();
  }

  done("empty");
};

onMounted(getDogs);
</script>

<template>
  <infinite-box :urls="urls" @load="load" @open="emit('open', $event)" />
</template>
