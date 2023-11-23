<script setup lang="ts">
interface Props {
  anime: string[];
  url?: string;
}

defineProps<Props>();

const emit = defineEmits<{
  coverEnd: [];
  coverLoad: [];
  getCover: [];
  openDetail: [src?: string];
}>();

const coverAnimeEnd = async ({ animationName: name }: AnimationEvent) => {
  if (name === "fadeOut") {
    emit("getCover");
    return;
  }

  emit("coverEnd");
};
</script>

<template>
  <v-img
    :class="anime"
    :src="url"
    class="cover-img"
    @animationend="coverAnimeEnd"
    @click.stop="emit('openDetail', url)"
    @error="emit('coverEnd')"
    @load="emit('coverLoad')"
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
  </v-img>
</template>

<style lang="scss" scoped>
.cover-img {
  cursor: pointer;
  height: 100%;
}
</style>
