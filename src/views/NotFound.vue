<template>
  <v-row>
    <v-col class="text-h3 primary--text" cols="12">
      {{ $t("views.notFound.title") }}
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NotFound extends Vue {}
</script>
