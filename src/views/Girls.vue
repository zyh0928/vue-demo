<template>
  <v-row>
    <v-col cols="12">
      <v-toolbar>
        <v-toolbar-title>
          <v-switch
            :disabled="sendLoading"
            :label="$t('views.girls.random')"
            @change="changeRandom"
            color="primary"
            hide-details
            v-model="isRandom"
          />
        </v-toolbar-title>

        <v-spacer />

        <v-btn
          :loading="sendLoading"
          @click="randomImgs"
          color="primary"
          icon
          v-if="isRandom"
        >
          <v-icon>mdi-cached</v-icon>
        </v-btn>

        <v-pagination
          :disabled="sendLoading"
          :length="length"
          :page="page"
          :total-visible="9"
          @input="getImgs"
          v-else
          v-model="page"
        />
      </v-toolbar>
    </v-col>

    <v-col>
      <v-container fluid>
        <transition-group
          class="row row--dense"
          enter-active-class="animate__animated animate__bounceIn animate__fast"
          leave-active-class="animate__animated animate__bounceOut animate__fast"
          mode="out-in"
          tag="div"
        >
          <v-col
            :key="`img${index}`"
            cols="12"
            lg="3"
            sm="6"
            v-for="({ url, publishedAt }, index) of imgs"
            xl="2"
          >
            <v-card @click.stop="openDetail(url)" hover>
              <v-img :src="url" aspect-ratio="1">
                <template #placeholder>
                  <v-row align="center" class="fill-height" justify="center">
                    <v-progress-circular
                      color="primary"
                      indeterminate
                      size="48"
                      width="2"
                    />
                  </v-row>
                </template>

                <v-row align="end" class="fill-height text-end">
                  <v-col class="pr-4 text-h5 white--text card-txt">
                    {{ publishedAt ? publishedAt.substring(0, 10) : "-" }}
                  </v-col>
                </v-row>
              </v-img>
            </v-card>
          </v-col>
        </transition-group>
      </v-container>
    </v-col>

    <v-dialog :width="detailWidth" v-model="detailDialog">
      <v-img :src="detailUrl" />
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Action } from "vuex-class";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Girls extends Vue {
  isRandom = !0;

  sendLoading = !1;

  imgs: any[] = [];

  async changeRandom(val: boolean): Promise<void> {
    if (val) {
      await this.randomImgs();
    } else {
      this.page = 1;
      this.total = 0;
      await this.getImgs();
    }
  }

  @Action
  readonly getAjax!: (api: string) => Promise<any>;

  async randomImgs(): Promise<void> {
    if (this.sendLoading) return;

    try {
      this.sendLoading = !0;

      this.imgs = [];

      const { data } = await this.getAjax(
        "random/category/Girl/type/Girl/count/12"
      );

      this.imgs = data;

      this.sendLoading = !1;
    } catch (e) {
      this.sendLoading = !1;
      throw e;
    }
  }

  page = 1;

  size = 12;

  total = 0;

  get length(): number {
    return this.total ? Math.ceil(this.total / this.size) : 1;
  }

  async getImgs(): Promise<void> {
    if (this.sendLoading) return;

    try {
      this.sendLoading = !0;

      this.imgs = [];

      const { data, total_counts } = await this.getAjax(
        `data/category/Girl/type/Girl/page/${this.page}/count/${this.size}`
      );

      this.total = total_counts;

      this.imgs = data;

      this.sendLoading = !1;
    } catch (e) {
      this.sendLoading = !1;
      throw e;
    }
  }

  detailDialog = !1;

  detailWidth = 0;

  detailUrl = "";

  openDetail(url: string): void {
    const img = new Image();

    img.src = url;

    img.addEventListener("load", () => {
      this.detailWidth = img.width;
      this.detailUrl = url;
      this.detailDialog = !0;
    });
  }

  async created(): Promise<void> {
    await this.randomImgs();
  }
}
</script>

<style lang="scss" scoped>
.card-txt {
  text-shadow: 2px 2px 4px rgba(black, 0.7);
}
</style>
