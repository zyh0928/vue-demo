<script lang="ts" setup>
import { useElementSize } from "@vueuse/core";
import { useDisplay } from "vuetify/lib/framework.mjs";

import { getList as getCats } from "$/cat";
import { getList as getDogs } from "$/dog";
import { getList as getGirls } from "$/girl";
import { animations, modes } from "~/variables.json";

import CoverImg from "./components/CoverImg.vue";
import ListImg from "./components/ListImg.vue";

interface State {
  anime: string[];
  cover?: string;
  list: string[];
  loading: boolean;
  mode: number[];
  type: string;
}

interface Detail {
  dialog: boolean;
  url: string;
  width: number;
}

const tools = ref(null);

const toolSize = useElementSize(tools);
const { mobile } = useDisplay();

const state = reactive<State>({
  anime: ["animate__animated", "animate__fast"],
  list: [],
  loading: !1,
  mode: [],
  type: "dog",
});

const detail = reactive<Detail>({
  dialog: !1,
  url: "",
  width: 0,
});

const categories = ["girl", "dog", "cat"];

const showCover = computed(() => state.type === "girl");

const toolbarSrc = computed(() => {
  const width = Math.round(toolSize.width.value);
  const height = Math.round(toolSize.height.value);

  return `https://picsum.photos/${width}/${height}`;
});

const getCover = async () => {
  const mode = state.mode.join(",") || void 0;

  state.cover = (await getGirls({ mode })).url;

  if (!state.cover) {
    state.cover = "/undefined";
  }
};

const coverLoad = () => {
  const idx = Math.floor(Math.random() * animations.length);

  state.anime.splice(2, 1, `animate__${animations[idx]}`);
};

const coverEnd = () => {
  state.anime.splice(2);
  state.loading = !1;
};

const getImgs = async (type = state.type) => {
  state.loading = !0;

  switch (type) {
    case "girl":
      state.list = [];
      if (!state.cover) {
        getCover();
      } else {
        state.anime.push("animate__fadeOut");
      }
      return;

    case "dog":
      state.mode = [];
      state.cover = "";
      state.list = await getDogs();
      break;

    case "cat":
      state.mode = [];
      state.cover = "";
      state.list = (await getCats()).map(({ url }: Recordable<string>) => url);
      break;
  }

  state.loading = !1;
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

watch(() => state.type, getImgs);

watch(
  () => state.mode,
  () => {
    if (state.type !== "girl") return;

    getImgs();
  },
);

onMounted(getImgs);
</script>

<template>
  <div class="box">
    <v-toolbar :extended="showCover">
      <template #image>
        <v-img ref="tools" :src="toolbarSrc" class="bg-on-surface-variant" />
      </template>

      <template v-if="showCover" #extension>
        <v-btn-toggle
          v-model="state.mode"
          :disabled="state.loading"
          multiple
          class="ml-4"
          color="secondary"
          density="compact"
        >
          <v-btn
            v-for="{ label, value } of modes.filter(
              ({ mobile: show = !0 }) => !mobile || show,
            )"
            :key="value"
            :active="!1"
            :value="value"
            class="text-none"
          >
            {{ label }}
          </v-btn>
        </v-btn-toggle>
      </template>

      <v-btn-toggle
        v-model="state.type"
        :disabled="state.loading"
        mandatory
        class="ml-4"
        color="secondary"
        density="compact"
      >
        <v-btn
          v-for="category in categories"
          :key="category"
          :active="!1"
          :value="category"
          class="text-none"
        >
          {{ $t(`views.image.${category}`) }}
        </v-btn>
      </v-btn-toggle>

      <v-btn
        :loading="state.loading"
        class="ml-4"
        color="secondary"
        icon="mdi-refresh"
        variant="flat"
        @click="getImgs()"
      />
    </v-toolbar>

    <div class="box-list">
      <div class="box-list-wrap">
        <cover-img
          v-if="showCover"
          :anime="state.anime"
          :url="state.cover"
          @cover-end="coverEnd"
          @cover-load="coverLoad"
          @get-cover="getCover"
          @open-detail="openDetail"
        />

        <v-row v-else dense>
          <v-col v-for="(url, idx) in state.list" :key="url" cols="12" sm="3">
            <list-img :index="idx" :url="url" @open-detail="openDetail" />
          </v-col>
        </v-row>
      </div>
    </div>

    <v-dialog
      v-model="detail.dialog"
      :width="detail.width"
      max-height="100%"
      max-width="100%"
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
  grid-template: auto 1fr / 1fr;
  height: 100%;

  &-list {
    position: relative;

    &-wrap {
      position: absolute;
      padding: 8px;
      width: 100%;
      height: 100%;
      overflow: hidden scroll;
    }
  }
}
</style>
