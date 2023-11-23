<script setup lang="ts">
import { animations } from "~/variables.json";

interface Props {
  index: number;
  url?: string;
}

defineProps<Props>();

defineEmits<{ openDetail: [src?: string] }>();

const anime = ref(["animate__animated", "animate__fast"]);

const load = () => {
  const idx = Math.floor(Math.random() * animations.length);

  anime.value.push(`animate__${animations[idx]}`);
};
</script>

<template>
  <v-card :class="anime" hover @click.stop="$emit('openDetail', url)">
    <v-img :aspect-ratio="4 / 3" :src="url" cover @load="load">
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

      <template #error>
        <div class="h-100 d-flex justify-center align-center">
          <v-icon size="64">mdi-image-broken</v-icon>
        </div>
      </template>

      <div class="h-100 d-flex justify-end align-end">
        <div class="text-h5 card-txt">No. {{ index + 1 }}</div>
      </div>
    </v-img>
  </v-card>
</template>

<style lang="scss" scoped>
$border-color: rgba(var(--v-theme-on-background));

.card-txt {
  margin: 16px;
  color: rgb(var(--v-theme-background));
  text-shadow:
    $border-color 1px 0 0,
    $border-color 0 1px 0,
    $border-color -1px 0 0,
    $border-color 0 -1px 0;
}
</style>
