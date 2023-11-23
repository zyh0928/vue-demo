<script lang="ts" setup>
import { useElementSize } from "@vueuse/core";
import { useDisplay } from "vuetify/lib/framework.mjs";

import { getList as getCats } from "$/cat";
import { getList as getDogs } from "$/dog";
import { getList as getGirls, getView } from "$/girl";
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
  view: string;
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
  type: "list",
  view: "mjx",
});

const listCache = ref<string[]>([]);
// const listPage = ref(1);

const detail = reactive<Detail>({
  dialog: !1,
  url: "",
  width: 0,
});

const categories = ["girl", "list", "dog", "cat"];

const views = ref([
  {
    label: "mjx",
    value: "mjx",
  },
  {
    label: "tuwan",
    value: "tuwan",
  },
  {
    label: "1628517708",
    value: "1628517708",
  },
  {
    label: "1624387144",
    value: "1624387144",
  },
  {
    label: "1631028859",
    value: "1631028859",
  },
]);

const showEx = computed(() => state.type === "girl" || state.type === "list");

const toolbarSrc = computed(() => {
  const width = Math.round(toolSize.width.value);
  const height = Math.round(toolSize.height.value);

  return `https://picsum.photos/${width}/${height}`;
});

// const total = computed(() => {
//   if (state.type !== "list") return 0;
//   return Math.ceil(listCache.value.length / 20);
// });

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

  if ((type === "girl" || type === "list") && state.mode.length) {
    state.list = [];
  }

  if (type !== "girl") {
    if (state.cover) {
      state.cover = "";
    }

    if (state.mode.length) {
      state.mode = [];
    }
  }

  if (type !== "list" && listCache.value.length) {
    listCache.value = [];
  }

  switch (type) {
    case "girl":
      if (!state.cover) {
        getCover();
      } else {
        state.anime.push("animate__fadeOut");
      }
      return;

    case "list": {
      const file = (await getView(state.view)) ?? "";
      const imgs: string[] = file.split(/[(\r\n)\r\n]+/);

      listCache.value = imgs.filter((img) => img.startsWith("http"));

      const title = imgs.find((img) => img.startsWith("标题"));
      if (!title) break;

      const item = views.value.find(({ label }) => label === state.view);
      if (!item) break;

      item.label = `${title.substring(5)} (${listCache.value.length})`;
      break;
    }

    case "dog":
      state.list = await getDogs();
      break;

    case "cat":
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
  () => state.view,
  () => {
    if (state.type !== "list") return;

    getImgs();
  },
);

watch(listCache, () => {
  if (state.type !== "list") return;

  state.list = listCache.value.slice(0, 20);
});

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
    <v-toolbar :extended="showEx">
      <template #image>
        <v-img ref="tools" :src="toolbarSrc" class="bg-on-surface-variant" />
      </template>

      <template v-if="showEx" #extension>
        <v-btn-toggle
          v-if="state.type === 'girl'"
          v-model="state.mode"
          :disabled="state.loading"
          multiple
          class="ml-2"
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

        <v-slide-group v-else v-model="state.view" mandatory>
          <template #prev>
            <v-icon class="arrow">mdi-chevron-left</v-icon>
          </template>

          <template #next>
            <v-icon class="arrow">mdi-chevron-right</v-icon>
          </template>

          <v-slide-group-item
            v-for="{ value, label } in views"
            :key="value"
            v-slot="{ isSelected, toggle }"
            :value="value"
          >
            <v-btn
              :color="isSelected ? 'secondary' : void 0"
              :disabled="state.loading"
              rounded
              class="ma-2"
              size="small"
              variant="elevated"
              @click="toggle"
            >
              {{ label }}
            </v-btn>
          </v-slide-group-item>
        </v-slide-group>
      </template>

      <v-btn-toggle
        v-model="state.type"
        :disabled="state.loading"
        mandatory
        class="ml-2"
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
        v-if="state.type !== 'list'"
        :loading="state.loading"
        class="ml-4"
        color="secondary"
        icon="mdi-refresh"
        size="small"
        variant="flat"
        @click="getImgs()"
      />
    </v-toolbar>

    <div class="box-list">
      <div class="box-list-wrap">
        <cover-img
          v-if="state.type === 'girl'"
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
$border-color: rgba(var(--v-theme-on-background));

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

.arrow {
  color: rgb(var(--v-theme-background));
  text-shadow:
    $border-color 1px 0 0,
    $border-color 0 1px 0,
    $border-color -1px 0 0,
    $border-color 0 -1px 0;
}
</style>
