<template>
  <v-layout>
    <v-flex display-2 pt-5 text-center>{{ $t("view.notFound.title") }}</v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NotFound extends Vue {}
</script>
