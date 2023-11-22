<script lang="ts" setup>
import { useElementSize } from "@vueuse/core";

import { getList as getCats } from "$/cat";
import { getList as getDogs } from "$/dog";
import { getList as getGirls } from "$/girl";
import { modes } from "~/variables.json";

interface State {
  anime: string;
  cover: string;
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

const state = reactive<State>({
  anime: "",
  cover: "",
  list: [],
  loading: !1,
  mode: [],
  type: "girl",
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

const getImgs = async (type = state.type) => {
  state.loading = !0;
  state.cover = "";
  state.list = [];

  switch (type) {
    case "girl":
      state.anime = "";
      state.cover =
        (await getGirls({ mode: state.mode.join(",") || void 0 })).url ?? "";
      break;

    case "dog":
      state.mode = [];
      state.list = await getDogs();
      break;

    case "cat":
      state.mode = [];
      state.list = (await getCats()).map(({ url }: Recordable<string>) => url);
      break;
  }

  state.loading = !1;
};

const openDetail = (url: string) => {
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
  async (mode) => {
    if (state.type !== "girl") return;

    state.loading = !0;
    state.anime = "";
    state.cover =
      (await getGirls({ mode: mode.join(",") || void 0 })).url ?? "";
    state.loading = !1;
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
            v-for="{ label, value } of modes"
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

      <v-btn
        v-if="showCover"
        class="ml-4"
        color="secondary"
        icon="mdi-eye"
        variant="flat"
        @click.stop="openDetail(state.cover)"
      />
    </v-toolbar>

    <div class="box-list">
      <div class="box-list-wrap">
        <v-img
          v-if="showCover"
          :class="state.anime"
          :src="state.cover"
          height="100%"
          @load="state.anime = 'animate__animated animate__jello animate__fast'"
        >
          <template #placeholder>
            <div class="h-100 d-flex justify-center align-center">
              <v-progress-circular
                indeterminate
                color="primary"
                size="64"
                width="2"
              />
            </div>
          </template>
        </v-img>

        <transition-group
          v-else
          class="v-row v-row--dense"
          name="list"
          tag="div"
        >
          <v-col
            v-for="(url, idx) in state.list"
            :key="url"
            cols="12"
            lg="4"
            sm="6"
            xl="3"
          >
            <v-card hover @click.stop="openDetail(url)">
              <v-img :aspect-ratio="4 / 3" :src="url" cover>
                <template #placeholder>
                  <div class="h-100 d-flex justify-center align-center">
                    <v-progress-circular
                      indeterminate
                      color="primary"
                      size="48"
                      width="2"
                    />
                  </div>
                </template>

                <div class="h-100 d-flex justify-end align-end">
                  <div class="text-h5 card-txt">No. {{ idx + 1 }}</div>
                </div>
              </v-img>
            </v-card>
          </v-col>
        </transition-group>
      </div>
    </div>

    <v-dialog
      v-model="detail.dialog"
      :width="detail.width"
      max-height="100vh"
      max-width="1200"
    >
      <v-card>
        <v-img :src="detail.url" cover />
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

.card-txt {
  margin: 16px;
  color: rgb(var(--v-theme-background));
  text-shadow: 0 0 2px rgba(var(--v-theme-on-background), 0.7);
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  transform: translateX(30px);
  opacity: 0;
}

.list-leave-active {
  position: absolute;
}
</style>
