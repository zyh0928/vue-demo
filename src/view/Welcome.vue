<template>
  <v-layout column>
    <v-flex mt-5 shrink>
      <v-toolbar>
        <v-spacer />

        <v-toolbar-items>
          <v-btn @click="shuffle" color="info" text>shuffle</v-btn>

          <v-btn @click="add" color="success" text>add</v-btn>

          <v-btn @click="remove" color="error" text>remove</v-btn>
        </v-toolbar-items>

        <v-spacer />
      </v-toolbar>
    </v-flex>

    <v-flex mt-5 shrink>
      <draggable
        animation="200"
        class="container grid-list-md pa-0 box"
        v-model="list"
      >
        <transition-group
          class="layout wrap"
          enter-active-class="animated rubberBand"
          leave-active-class="animated hinge"
          name="list"
          tag="div"
        >
          <v-flex :key="`gird${i}`" v-for="i of list" xs4>
            <v-card :color="randomColor()" hover>
              <v-img aspect-ratio="1" class="white--text">
                <v-layout align-center display-1 fill-height justify-center>{{
                  i
                }}</v-layout>
              </v-img>
            </v-card>
          </v-flex>
        </transition-group>
      </draggable>
    </v-flex>

    <v-flex mt-5 shrink>
      <v-card class="mx-auto" width="50%">
        <v-card-text>
          <v-text-field
            :error-messages="errors.collect('api')"
            :hint="$t('view.welcome.hint')"
            @click:append="$validator.reset()"
            @keyup.enter.stop="sendAjax"
            append-icon="mdi-restore"
            clearable
            counter
            data-vv-as="API"
            data-vv-name="api"
            label="API"
            outlined
            v-model.trim="api"
            v-validate="'required'"
          />
        </v-card-text>
      </v-card>

      <v-toolbar class="mt-2 mx-auto" width="50%">
        <v-toolbar-title>
          <v-switch
            :disabled="sendLoading"
            :label="$t('view.welcome.randomImgs')"
            @change="changeRandom"
            class="mr-12"
            color="primary"
            hide-details
            v-model="isRandom"
          />
        </v-toolbar-title>

        <v-spacer />

        <v-btn
          :loading="sendLoading"
          @click="randomImgs"
          color="info"
          icon
          v-if="isRandom"
        >
          <v-icon>mdi-cached</v-icon>
        </v-btn>

        <v-toolbar-items v-else>
          <v-btn
            :disabled="sendLoading || page === 1"
            @click="page--"
            color="primary"
            text
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>

          <v-btn :loading="sendLoading" color="primary" fab small>{{
            page
          }}</v-btn>

          <v-btn
            :disabled="sendLoading || cantNext"
            @click="page++"
            color="primary"
            text
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-flex>

    <v-flex shrink>
      <v-container fluid grid-list-md>
        <transition-group
          class="layout wrap"
          enter-active-class="animated bounceIn fast"
          leave-active-class="animated bounceOut fast"
          mode="out-in"
          tag="div"
        >
          <v-flex
            :key="`img${index}`"
            lg3
            sm6
            v-for="({ url, publishedAt }, index) of imgs"
            v-show="!imgErrors.includes(index)"
            xl2
            xs12
          >
            <v-card @click.stop="openDetail(url)" hover>
              <v-img :src="url" @error="imgErrors.push(index)" aspect-ratio="1">
                <template #placeholder>
                  <v-layout align-center fill-height justify-center>
                    <v-progress-circular
                      color="primary"
                      indeterminate
                      size="48"
                      width="2"
                    />
                  </v-layout>
                </template>

                <v-layout align-end fill-height justify-end>
                  <v-flex card-txt headline shrink white--text>
                    {{ publishedAt ? publishedAt.substring(0, 10) : "-" }}
                  </v-flex>
                </v-layout>
              </v-img>
            </v-card>
          </v-flex>
        </transition-group>
      </v-container>
    </v-flex>

    <v-dialog :width="detailWidth" v-model="detailDialog">
      <v-img :src="detail" />
    </v-dialog>
  </v-layout>
</template>

<script lang="ts">
// @ts-ignore
import Draggable from "vuedraggable";
import _ from "lodash";
import { Component, Vue, Watch } from "vue-property-decorator";
import { Action } from "vuex-class";

@Component({
  components: {
    Draggable
  }
})
export default class Welcome extends Vue {
  list = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  next = 10;

  random() {
    return Math.floor(Math.random() * this.list.length);
  }

  shuffle() {
    this.list = _.shuffle(this.list);
  }

  add() {
    this.list.splice(this.random(), 0, this.next++);
  }

  remove() {
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
    "grey"
  ];

  randomColor: Function = (): string =>
    this.colors[Math.floor(Math.random() * this.colors.length)];

  @Action
  readonly getAjax!: Function;

  api = "";

  async sendAjax() {
    const flag = await this.$validator.validate("api");

    if (!flag) return;

    const { results } = await this.getAjax(this.api);

    // eslint-disable-next-line no-console
    console.log(results);
  }

  sendLoading = !1;

  imgs: any[] = [];

  imgErrors: number[] = [];

  errorLoading = !1;

  detailDialog = !1;

  detailWidth = 0;

  detail = "";

  openDetail(url: string) {
    const img = new Image();

    img.src = url;

    img.addEventListener("load", () => {
      this.detailWidth = img.width;
      this.detail = url;
      this.detailDialog = !0;
    });
  }

  isRandom = !0;

  async randomImgs() {
    if (this.sendLoading) return;

    try {
      this.sendLoading = !0;

      const random = Math.floor(Math.random() * 1000000) + 12;

      const { results } = await this.getAjax(`random/data/福利/${random}`);

      this.imgErrors = [];

      this.imgs = results;

      this.sendLoading = !1;
    } catch (e) {
      this.sendLoading = !1;
      throw e;
    }
  }

  page = 0;

  @Watch("page")
  async onPageChanged(val: number) {
    await this.getList();
  }

  cantNext = !1;

  async getList() {
    if (this.sendLoading) return;

    try {
      this.sendLoading = !0;

      const { results } = await this.getAjax(`data/福利/12/${this.page}`);

      this.imgErrors = [];

      this.cantNext = results.length < 12;

      results.length ? (this.imgs = results) : this.page--;

      this.sendLoading = !1;
    } catch (e) {
      this.sendLoading = !1;
      throw e;
    }
  }

  async changeRandom(val: boolean) {
    if (val) {
      await this.randomImgs();
      return;
    }

    if (this.page === 1) await this.getList();
    else this.page = 1;
  }
}
</script>

<style lang="scss" scoped>
.card-txt {
  text-shadow: 2px 2px 4px rgba(black, 0.7);
}

.box {
  width: 300px;
}

.list-move {
  transition: transform 1s;
}
</style>
