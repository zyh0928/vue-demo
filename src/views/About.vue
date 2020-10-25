<template>
  <v-row>
    <v-col class="text-h3 primary--text" cols="12">
      {{ $t("views.about.title") }}
    </v-col>

    <v-col
      :key="`env${item.key}`"
      class="text-subtitle-2 item"
      cols="12"
      v-for="item of props"
    >
      {{ item.key }}:{{ item.value }}
    </v-col>

    <!-- <v-card height="1500" /> -->
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

interface kv {
  key: string;
  value: string;
}
[];

@Component
export default class About extends Vue {
  readonly env = process.env;

  get props(): kv[] {
    const res: kv[] = [];

    Object.keys(this.env).forEach((key) =>
      res.push({
        key,
        value: this.env[key],
      })
    );

    return res;
  }
}
</script>
