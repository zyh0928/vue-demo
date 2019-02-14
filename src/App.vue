<template>
  <v-app>
    <my-sidebar />

    <my-header />

    <v-content>
      <v-container fill-height fluid pa-0>
        <transition
          enter-active-class="animated jackInTheBox fast"
          leave-active-class="animated bounceOut fast"
          mode="out-in"
        >
          <router-view />
        </transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import MyHeader from "@/component/MyHeader.vue";
import MySidebar from "@/component/MySidebar.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    MyHeader,
    MySidebar
  }
})
export default class App extends Vue {}
</script>
