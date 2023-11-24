<script setup lang="ts">
import { getGirl } from "$/girl";
import { animations } from "~/variables.json";

interface Props {
  loading?: boolean;
  mode: number[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  openDetail: [src?: string];
  "update:loading": [value: boolean];
}>();

const src = ref<string | undefined>();
const anime = ref(["animate__animated", "animate__fast"]);

const setCover = async () => {
  const params = {
    mode: props.mode.join(",") || void 0,
  };
  const { url } = (await getGirl(params)) ?? {};
  src.value = !url ? "/undefined" : url;
};

const getCover = () => {
  if (props.loading) return;

  emit("update:loading", !0);
  if (src.value) {
    anime.value.push("animate__fadeOut");
    return;
  }

  setCover();
};

const coverLoad = () => {
  const idx = Math.floor(Math.random() * animations.length);
  anime.value.splice(2, 1, `animate__${animations[idx]}`);
};

const coverEnd = () => {
  anime.value.splice(2);
  emit("update:loading", !1);
};

const coverAnimeEnd = async ({ animationName: name }: AnimationEvent) => {
  if (name === "fadeOut") {
    setCover();
    return;
  }

  coverEnd();
};

watch(() => props.mode, getCover);
onMounted(getCover);
</script>

<template>
  <v-img
    :class="anime"
    :src="src"
    class="cover-img"
    @animationend="coverAnimeEnd"
    @click.stop="getCover"
    @error="coverEnd"
    @load="coverLoad"
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

    <template #error>
      <div class="h-100 d-flex justify-center align-center">
        <v-icon size="64">mdi-image-broken-variant</v-icon>
      </div>
    </template>

    <v-btn
      v-show="!loading"
      class="ma-2"
      color="primary"
      icon="mdi-eye"
      size="small"
      @click.stop="emit('openDetail', src)"
    />
  </v-img>
</template>

<style lang="scss" scoped>
.cover-img {
  position: absolute;
  top: 8px;
  right: 8px;
  bottom: 8px;
  left: 8px;
  cursor: pointer;
  overflow: hidden;
}
</style>
