<template>
  <v-layout>
    <!-- <v-flex display-1 pt-5 teal--text text-center>{{
      $t("view.about.title")
    }}</v-flex> -->
    <v-flex display-1 font-weight-light pt-5 teal--text text-center>{{
      env
    }}</v-flex>

    <v-card height="1500" />
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class About extends Vue {
  readonly env = process.env;
}
</script>
