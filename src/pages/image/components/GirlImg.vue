<script setup lang="ts">
import { getGirls } from "$/girl";

import InfiniteBox, { type InfiniteLoad } from "./InfiniteBox.vue";

interface Props {
  loading?: boolean;
  view?: string;
  views?: OptionType<string>[];
}

interface State {
  cache: string[];
  loaded: boolean;
  page: number;
  size: number;
}

const props = withDefaults(defineProps<Props>(), {
  view: "mjx",
  views: () => [],
});

const emit = defineEmits<{
  open: [src?: string];
  "update:loading": [value: boolean];
}>();

const urls = ref<string[]>([]);

const state = reactive<State>({
  cache: [],
  loaded: !1,
  page: 1,
  size: 20,
});

const total = computed(() => Math.ceil(state.cache.length / state.size));

const loadUrls = () => {
  if (state.page >= total.value) {
    state.loaded;
    return;
  }

  urls.value.push(
    ...state.cache.slice(
      state.page * state.size,
      (state.page + 1) * state.size,
    ),
  );

  state.page++;
};

const getGirl = async () => {
  state.loaded = !1;
  state.page = 1;
  state.cache = [];
  emit("update:loading", !0);
  const { imgs, other } = await getGirls(props.view);
  emit("update:loading", !1);

  state.loaded = !0;
  state.cache = imgs;

  const title = other.find((img) => img.startsWith("标题"));
  if (!title) return;

  const item = props.views.find(({ label }) => label === props.view);
  if (!item) return;

  item.label = `${title.substring(5)} (${imgs.length})`;
};

const load: InfiniteLoad = ({ done }) => {
  if (state.loaded) {
    loadUrls();
  }

  done("empty");
};

watch(
  () => state.cache,
  async (list) => {
    urls.value = list.slice(0, state.size);
    await nextTick();
    state.loaded = !0;
  },
);

watch(() => props.view, getGirl);

onMounted(getGirl);
</script>

<template>
  <infinite-box :urls="urls" @load="load" @open="emit('open', $event)">
    <template #prepend>
      <div class="text-h6 outline-font count">
        {{ `${state.page}/${total}` }}
      </div>
    </template>
  </infinite-box>
</template>

<style lang="scss" scoped>
.count {
  position: fixed;
  bottom: 8px;
  left: 8px;
  z-index: 1;
  padding: 0 8px;
}
</style>
