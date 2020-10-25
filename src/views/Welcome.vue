<template>
  <v-row class="fill-height" justify="center">
    <v-col cols="12">
      <v-toolbar>
        <v-spacer />

        <v-toolbar-items>
          <v-btn @click="shuffle" color="info" text>shuffle</v-btn>

          <v-btn @click="add" color="success" text>add</v-btn>

          <v-btn @click="remove" color="error" text>remove</v-btn>
        </v-toolbar-items>

        <v-spacer />
      </v-toolbar>
    </v-col>

    <v-col cols="4">
      <draggable animation="200" class="container pa-0" v-model="list">
        <transition-group
          class="row row--dense"
          enter-active-class="animate__animated animate__rubberBand"
          leave-active-class="animate__animated animate__hinge"
          tag="div"
        >
          <v-img
            :key="`grid${i}`"
            aspect-ratio="1"
            class="col col-4"
            v-for="i of list"
          >
            <div
              :class="[randomColor()]"
              class="fill-height d-flex align-center justify-center text-h1 white--text grid"
              v-text="i"
            />
          </v-img>
        </transition-group>
      </draggable>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Draggable from "vuedraggable";
import shuffle from "lodash/shuffle";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    Draggable,
  },
})
export default class Welcome extends Vue {
  list = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  next = 10;

  random(): number {
    return Math.floor(Math.random() * this.list.length);
  }

  shuffle(): void {
    this.list = shuffle(this.list);
  }

  add(): void {
    this.list.splice(this.random(), 0, this.next++);
  }

  remove(): void {
    this.list.splice(this.random(), 1);
  }

  colors = [
    "red",
    "pink",
    "purple",
    "deep-purple",
    "indigo",
    "blue",
    "light-blue",
    "cyan",
    "teal",
    "green",
    "light-green",
    "lime",
    "yellow",
    "amber",
    "orange",
    "deep-orange",
    "brown",
    "blue-grey",
    "grey",
  ];

  randomColor = (): string =>
    this.colors[Math.floor(Math.random() * this.colors.length)];
}
</script>

<style lang="scss" scoped>
.v-move {
  transition: transform 1s;
}

.grid {
  border-radius: 8px;
  cursor: pointer;
}
</style>
