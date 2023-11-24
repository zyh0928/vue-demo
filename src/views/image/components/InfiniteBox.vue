<script setup lang="ts">
import { animations } from "~/variables.json";

import type { VInfiniteScroll as DefaultProps } from "vuetify/components";

export type InfiniteLoad = DefaultProps["onLoad"];

interface Props extends /* @vue-ignore */ Partial<DefaultProps> {
  urls?: string[];
}

withDefaults(defineProps<Props>(), {
  urls: () => [],
});

defineEmits<{ open: [src?: string] }>();

const animes = ref<(string | undefined)[]>([]);

const load = (index: number) => {
  const idx = Math.floor(Math.random() * animations.length);

  animes.value[index] = `animate__${animations[idx]}`;
};
</script>

<template>
  <v-infinite-scroll class="infinite-box">
    <template #loading>
      <div class="pa-2">
        <v-progress-circular indeterminate size="48" />
      </div>
    </template>

    <template #empty>
      <div class="pa-2">
        <v-icon size="48">mdi-database-off-outline</v-icon>
      </div>
    </template>

    <slot name="prepend" />

    <v-row dense>
      <v-col
        v-for="(url, idx) in urls"
        :key="url"
        cols="12"
        lg="4"
        sm="6"
        xl="3"
      >
        <v-card
          :class="animes[idx]"
          hover
          class="animate__animated animate__fast"
          @click.stop="$emit('open', url)"
        >
          <v-img :src="url" cover aspect-ratio="1" @load="load(idx)">
            <template #placeholder>
              <div class="h-100 d-flex justify-center align-center">
                <v-progress-circular indeterminate color="primary" size="48" />
              </div>
            </template>

            <template #error>
              <div class="h-100 d-flex justify-center align-center">
                <v-icon size="64">mdi-image-broken</v-icon>
              </div>
            </template>

            <div class="h-100 d-flex justify-end align-end">
              <div class="ma-2 text-h5 outline-font">No. {{ idx + 1 }}</div>
            </div>
          </v-img>
        </v-card>
      </v-col>
    </v-row>

    <slot name="append" />
  </v-infinite-scroll>
</template>

<style scoped lang="scss">
.infinite-box {
  position: absolute;
  padding: 8px;
  width: 100%;
  height: 100%;
  overflow: hidden scroll;
}
</style>
