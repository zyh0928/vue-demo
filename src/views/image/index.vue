<script lang="ts" setup>
import { useElementSize } from "@vueuse/core";

import { categories, modes } from "~/view/image.json";

import CoverImg from "./components/CoverImg.vue";

interface Detail {
  dialog: boolean;
  url: string;
  width: number;
}

// type InfiniteDone = (state: "ok" | "empty" | "loading" | "error") => void;

const tools = ref(null);

const toolSize = useElementSize(tools);

const loading = ref(!1);
const type = ref("cover");
const mode = ref<number[]>([]);
// const views = ref();

// const listCache = ref<string[]>([]);
// const listPage = ref(1);

const detail = reactive<Detail>({
  dialog: !1,
  url: "",
  width: 0,
});

const showExtra = computed(() => type.value !== "cat");

const toolbarSrc = computed(() => {
  const width = Math.round(toolSize.width.value);
  const height = Math.round(toolSize.height.value);

  return `https://picsum.photos/${width}/${height}`;
});

const reset = () => {
  mode.value = [];
};

// const getImgs = async (type = state.type) => {

//   switch (type) {
//     case "list": {
//       const file = (await getView(state.view)) ?? "";
//       const imgs: string[] = file.split(/[(\r\n)\r\n]+/);

//       listCache.value = imgs.filter((img) => img.startsWith("http"));

//       const title = imgs.find((img) => img.startsWith("标题"));
//       if (!title) break;

//       const item = views.value.find(({ label }) => label === state.view);
//       if (!item) break;

//       item.label = `${title.substring(5)} (${listCache.value.length})`;
//       break;
//     }

//     case "dog": {
//       const dogs = await getDogs();

//       state.list.push(...dogs);

//       listPage.value++;
//       break;
//     }

//     case "cat": {
//       const cats = (await getCats()).map(({ url }: Recordable<string>) => url);

//       state.list.push(...cats);

//       listPage.value++;
//       break;
//     }
//   }

//   state.loading = !1;
// };

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

// const load = async ({ done }: { done: InfiniteDone }) => {
//   if (listPage.value > 1) {
//     await getImgs(state.type);
//   }

//   done("error");
// };

watch(type, reset);

// watch(
//   () => state.view,
//   () => {
//     if (state.type !== "list") return;

//     state.list = [];
//     getImgs();
//   },
// );

// watch(listCache, () => {
//   if (state.type !== "list") return;

//   state.list = listCache.value.slice(0, 20);
// });
</script>

<template>
  <div class="box">
    <v-toolbar>
      <template #image>
        <v-img ref="tools" :src="toolbarSrc" class="bg-on-surface-variant" />
      </template>

      <template v-if="showExtra" #extension>
        <v-slide-group v-if="type === 'cover'" v-model="mode" multiple>
          <template #prev>
            <v-icon class="arrow">mdi-chevron-left</v-icon>
          </template>

          <template #next>
            <v-icon class="arrow">mdi-chevron-right</v-icon>
          </template>

          <v-slide-group-item
            v-for="{ value, label } in modes"
            :key="value"
            v-slot="{ isSelected, toggle }"
            :value="value"
          >
            <v-btn
              :color="isSelected ? 'secondary' : void 0"
              :disabled="loading"
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

      <!-- <template v-if="showEx" #extension>
        <v-btn-toggle
          v-if="type === 'girl'"
          v-model="mode"
          :disabled="loading"
          multiple
          class="ml-2"
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

        <v-slide-group v-else v-model="view" mandatory>
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
              :disabled="loading"
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
      </template> -->

      <v-btn-toggle
        v-model="type"
        :disabled="loading"
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
    </v-toolbar>

    <div class="box-list">
      <cover-img
        v-if="type === 'cover'"
        v-model:loading="loading"
        :mode="mode"
        @open-detail="openDetail"
      />

      <!-- <v-infinite-scroll class="box-list-wrap" @load="load">
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
          <v-col
            v-for="(url, idx) in state.list"
            :key="url"
            cols="12"
            lg="4"
            sm="6"
            xl="3"
          >
            <list-img :index="idx" :url="url" @open-detail="openDetail" />
          </v-col>
        </v-row>
      </v-infinite-scroll> -->
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
