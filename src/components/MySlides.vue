<script setup lang="ts">
import type { VSlideGroup as DefaultProps } from "vuetify/components";

interface Props extends /* @vue-ignore */ Partial<DefaultProps> {
  disabled?: boolean;
  options?: OptionType[];
}

withDefaults(defineProps<Props>(), {
  options: () => [],
});
</script>

<template>
  <v-slide-group>
    <template #prev>
      <v-icon class="outline-font">mdi-chevron-left</v-icon>
    </template>

    <template #next>
      <v-icon class="outline-font">mdi-chevron-right</v-icon>
    </template>

    <v-slide-group-item
      v-for="{ value, label } of options"
      :key="value"
      v-slot="{ isSelected, toggle }"
      :value="value"
    >
      <v-btn
        :color="isSelected ? 'secondary' : void 0"
        :disabled="disabled"
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
