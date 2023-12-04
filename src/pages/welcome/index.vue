<script lang="ts" setup>
import anime from "animejs";

import type { AnimeInstance, AnimeParams } from "animejs";

type AnimeType = "axis" | "wave" | "fade";

interface AnimeOptions {
  changing: boolean;
  col: number;
  color: string;
  delay: number;
  paused: boolean;
  size: number;
  total: number;
  type: AnimeType;
}

const control = ref<Nullable<AnimeInstance>>();

const options = reactive<AnimeOptions>({
  changing: !1,
  col: 20,
  color: "#ab3b3a",
  delay: 300,
  paused: !1,
  size: 20,
  total: 200,
  type: "axis",
});

const grid = computed(() => [
  options.col,
  Math.ceil(options.total / options.col),
]);

const boxStyle = computed(() => ({
  width: `${options.size * options.col}px`,
}));

// #region anime params
const baseAnime = reactive<AnimeParams>({
  autoplay: !1,
  direction: "alternate",
  endDelay: options.delay,
  targets: ".node",
});

const axisAnime = computed<AnimeParams>(() => ({
  ...baseAnime,
  delay: anime.stagger(100, {
    from: "center",
    grid: grid.value,
    start: options.delay,
  }),
  easing: "easeInOutQuad",
  endDelay: 700,
  translateX: anime.stagger(10, {
    axis: "x",
    from: "center",
    grid: grid.value,
  }),
  translateY: anime.stagger(5, {
    axis: "y",
    from: "center",
    grid: grid.value,
  }),
  // eslint-disable-next-line sort-keys-fix/sort-keys-fix, vue/sort-keys
  rotateZ: [
    {
      duration: 3000,
      easing: "linear",
      value: 360,
    },
    anime.stagger([360, 480], {
      axis: "x",
      from: "center",
      grid: grid.value,
    }),
  ],
}));

const waveAnime = computed<AnimeParams>(() => ({
  ...baseAnime,
  delay: anime.stagger(50, {
    from: "center",
    grid: grid.value,
    start: options.delay,
  }),
  scale: [
    {
      duration: 500,
      easing: "easeOutSine",
      value: 0.1,
    },
    {
      duration: 1000,
      value: 1,
    },
  ],
}));

const fadeAnime = computed<AnimeParams>(() => ({
  ...baseAnime,
  delay: anime.stagger(50, {
    from: "first",
    grid: grid.value,
    start: options.delay,
  }),
  easing: "easeInOutSine",
  opacity: { duration: 800, easing: "linear", value: 0 },
  scale: () => anime.random(2, 0.5),
  translateX: () => anime.random(50, -50),
  translateY: () => anime.random(50, -50),
}));
// #endregion

const getControl = async () => {
  switch (options.type) {
    case "axis":
      control.value = anime(axisAnime.value);
      break;

    case "wave":
      control.value = anime(waveAnime.value);
      break;

    case "fade":
      control.value = anime(fadeAnime.value);
      break;
  }

  options.paused = !1;
  control.value.play();
  await control.value.finished;
  await onFinished();
};

const onFinished = async () => {
  if (options.changing) {
    control.value?.pause();
    anime.remove(".node");
    getControl();
    options.changing = !1;
  } else {
    control.value?.play();
    await control.value?.finished;
    onFinished();
  }
};

const changeAnime = async (value: AnimeType) => {
  if (!control.value) {
    getControl();
  }

  if (options.type === value) return;

  options.type = value;
  options.changing = !0;
};

const toggleAnime = () => {
  control.value?.paused ? control.value?.play() : control.value?.pause();
  options.paused = control.value?.paused ?? !1;
};

const stopAnime = () => {
  options.paused = !0;
  control.value?.restart();
  control.value?.pause();
};

onMounted(async () => {
  await changeAnime("axis");
});
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-toolbar>
        <v-btn-toggle
          :disabled="options.changing || options.paused"
          :model-value="options.type"
          class="h-100"
          color="primary"
          rounded="0"
          variant="text"
          mandatory
          @update:model-value="changeAnime"
        >
          <v-btn value="axis">{{ $t("views.welcome.axis") }}</v-btn>

          <v-btn value="wave">{{ $t("views.welcome.wave") }}</v-btn>

          <v-btn value="fade">{{ $t("views.welcome.fade") }}</v-btn>
        </v-btn-toggle>

        <v-btn
          :color="options.paused ? 'success' : 'primary'"
          :icon="`mdi-${options.paused ? 'play' : 'pause'}`"
          class="ml-3"
          @click="toggleAnime"
        />

        <v-spacer />

        <v-menu
          :close-on-content-click="!1"
          location="bottom end"
          transition="slide-x-transition"
        >
          <template #activator="{ props }">
            <v-btn
              class="mr-3"
              color="primary"
              icon="mdi-palette"
              v-bind="props"
            />
          </template>

          <v-card>
            <v-color-picker
              v-model="options.color"
              :modes="['rgba']"
              show-swatches
            />
          </v-card>
        </v-menu>

        <v-menu
          :close-on-content-click="!1"
          location="bottom end"
          transition="slide-x-transition"
        >
          <template #activator="{ props }">
            <v-btn class="mr-3" color="primary" icon="mdi-cog" v-bind="props" />
          </template>

          <v-sheet class="pa-2 pr-4" width="400">
            <v-slider
              v-model="options.total"
              class="mt-8"
              color="primary"
              max="300"
              min="100"
              prepend-icon="mdi-grid"
              step="1"
              thumb-label="always"
              hide-details
              @end="getControl"
              @start="stopAnime"
            />

            <v-slider
              v-model="options.size"
              class="mt-8"
              color="primary"
              max="50"
              min="10"
              prepend-icon="mdi-view-grid"
              step="1"
              thumb-label="always"
              hide-details
            />

            <v-slider
              v-model="options.col"
              class="mt-8"
              color="primary"
              max="30"
              min="10"
              prepend-icon="mdi-view-column"
              step="1"
              thumb-label="always"
              hide-details
              @end="getControl"
              @start="stopAnime"
            />
          </v-sheet>
        </v-menu>
      </v-toolbar>
    </v-col>

    <v-col class="mt-8" cols="12">
      <div :style="boxStyle" class="mx-auto box">
        <div
          v-for="value in options.total"
          :key="value"
          :style="{
            backgroundColor: options.color,
            height: `${options.size}px`,
            width: `${options.size}px`,
          }"
          class="node"
        />
      </div>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
.box {
  display: flex;
  position: relative;
  flex-wrap: wrap;
}
</style>
