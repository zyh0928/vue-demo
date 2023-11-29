<script setup lang="ts">
import { getGirl } from "$/girl";
import { animations } from "~/variables.json";

interface Props {
  loading?: boolean;
  mode: number[];
}

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits<{
  open: [src?: string];
  "update:loading": [value: boolean];
}>();

const src = ref<string | undefined>();
const anime = ref("");

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
    anime.value = "animate__fadeOut";
    return;
  }

  setCover();
};

const coverLoad = () => {
  const idx = Math.floor(Math.random() * animations.length);
  anime.value = `animate__${animations[idx]}`;
};

const coverEnd = () => {
  anime.value = "";
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
    class="animate__animated animate__fast cover-img"
    @animationend="coverAnimeEnd"
    @click.stop="getCover"
    @error="coverEnd"
    @load="coverLoad"
  >
    <template #placeholder>
      <div class="h-100 d-flex justify-center align-center">
        <v-progress-circular color="primary" size="64" indeterminate />
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
      @click.stop="emit('open', src)"
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
