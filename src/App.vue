<template>
  <v-app>
    <my-sidebar />

    <my-header />

    <v-main>
      <v-container fluid>
        <transition
          enter-active-class="animate__animated animate__jackInTheBox animate__fast"
          leave-active-class="animate__animated animate__bounceOut animate__fast"
          mode="out-in"
        >
          <router-view />
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import MyHeader from "@/components/MyHeader.vue";
import MySidebar from "@/components/MySidebar.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    MyHeader,
    MySidebar,
  },
})
export default class App extends Vue {}
</script>
