<script lang="ts" setup>
import { useElementSize } from "@vueuse/core";

import { categories, views as defaultViews, modes } from "~/pages/image.json";

import CatImg from "./components/CatImg.vue";
import CoverImg from "./components/CoverImg.vue";
import DogImg from "./components/DogImg.vue";
import GirlImg from "./components/GirlImg.vue";

interface Detail {
  dialog: boolean;
  url: string;
  width: number;
}

const tools = ref(null);

const toolSize = useElementSize(tools);

const loading = ref(!1);
const type = ref("cover");
const mode = ref<number[]>([]);
const views = ref(defaultViews);
const view = ref("mjx");

const detail = reactive<Detail>({
  dialog: !1,
  url: "",
  width: 0,
});

const toolbarSrc = computed(() => {
  const width = Math.round(toolSize.width.value);
  const height = Math.round(toolSize.height.value);

  return `https://picsum.photos/${width}/${height}`;
});

const showExtra = computed(() => type.value !== "cat");

const reset = () => {
  mode.value = [];
  views.value = defaultViews;
  view.value = "mjx";
};

const openDetail = (url?: string) => {
  if (!url) return;

  const img = new Image();
  img.src = url;
  img.addEventListener("load", () => {
    detail.width = img.width;
    detail.url = url;
    detail.dialog = !0;
  });
};

watch(type, reset);
</script>

<template>
  <div class="box">
    <v-toolbar>
      <template #image>
        <v-img ref="tools" :src="toolbarSrc" class="bg-on-surface-variant" />
      </template>

      <template v-if="showExtra" #extension>
        <my-slides
          v-if="type === 'cover'"
          v-model="mode"
          :disabled="loading"
          :options="modes"
          multiple
        />

        <my-slides
          v-else-if="type === 'girl'"
          v-model="view"
          :options="views"
          mandatory
        />
      </template>

      <v-btn-toggle
        v-model="type"
        :disabled="loading"
        class="ml-2"
        color="secondary"
        density="compact"
        mandatory
      >
        <v-btn
          v-for="category in categories"
          :key="category"
          :active="!1"
          :value="category"
          class="text-none"
        >
          {{ $t(`pages.image.${category}`) }}
        </v-btn>
      </v-btn-toggle>
    </v-toolbar>

    <div class="box-list">
      <cover-img
        v-if="type === 'cover'"
        v-model:loading="loading"
        :mode="mode"
        @open="openDetail"
      />

      <girl-img
        v-else-if="type === 'girl'"
        v-model:loading="loading"
        :view="view"
        :views="views"
        @open="openDetail"
      />

      <dog-img
        v-else-if="type === 'dog'"
        v-model:loading="loading"
        @open="openDetail"
      />

      <cat-img
        v-else-if="type === 'cat'"
        v-model:loading="loading"
        @open="openDetail"
      />
    </div>

    <v-dialog
      :model-value="detail.dialog && !loading"
      :width="detail.width"
      max-height="100%"
      max-width="100%"
      @update:model-value="detail.dialog = $event"
    >
      <v-card rounded="0" @click.stop="detail.dialog = !1">
        <v-img :src="detail.url" />
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
.box {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;

  &-list {
    position: relative;
  }
}
</style>
