<script lang="ts" setup>
import { getList as getCats } from "@/service/cat";
import { getList as getDogs } from "@/service/dog";

const title = ref("");

const page = ref("girl");

const imgs = ref<string[]>([]);

const getImgs = async () => {
  imgs.value = [];

  switch (page.value) {
    case "girl":
      return;

    case "cosplay": {
      return;
    }

    case "dog":
      imgs.value = await getDogs();
      return;

    case "cat":
      imgs.value = await getCats();
      return;
  }
};

const changePage = async (value: string) => {
  if (page.value === value) return;

  page.value = value;

  await getImgs();
};

onMounted(async () => {
  await getImgs();
});

const detailDialog = ref(!1);

const detailWidth = ref(0);

const detailUrl = ref("");

const openDetail = (url: string) => {
  const img = new Image();

  img.src = url;

  img.addEventListener("load", () => {
    detailWidth.value = img.width;
    detailUrl.value = url;
    detailDialog.value = !0;
  });
};
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-toolbar>
        <v-btn color="primary" icon="mdi-refresh" @click="getImgs" />

        <div v-if="page === 'cosplay'" class="text-h6">
          <span v-text="title" />
          <span v-text="`「 ${imgs.length} 张」`" />
        </div>

        <v-spacer />

        <v-btn-toggle
          :model-value="page"
          mandatory
          class="rounded-0"
          color="primary"
          variant="text"
          @update:model-value="changePage"
        >
          <v-btn value="girl"> {{ $t("views.image.girl") }} </v-btn>

          <v-btn value="cosplay"> Cosplay </v-btn>

          <v-btn value="dog"> {{ $t("views.image.dog") }} </v-btn>

          <v-btn value="cat"> {{ $t("views.image.cat") }} </v-btn>
        </v-btn-toggle>
      </v-toolbar>
    </v-col>

    <v-col cols="12">
      <v-container v-if="imgs.length">
        <transition-group
          class="v-row v-row--dense"
          enter-active-class="animate__animated animate__bounceIn animate__fast"
          leave-active-class="animate__animated animate__bounceOut animate__fast"
          mode="out-in"
          tag="div"
        >
          <v-col
            v-for="(url, index) of imgs"
            :key="`img${url}`"
            cols="12"
            lg="4"
            sm="6"
            xl="3"
          >
            <v-card hover @click.stop="openDetail(url)">
              <v-img :src="url" aspect-ratio="1">
                <template #placeholder>
                  <v-row align="center" class="fill-height" justify="center">
                    <v-progress-circular
                      indeterminate
                      color="primary"
                      size="48"
                      width="2"
                    />
                  </v-row>
                </template>

                <v-row dense align="end" class="fill-height text-end">
                  <v-col class="pr-4 text-h5 text-white card-txt">
                    No.{{ index + 1 }}
                  </v-col>
                </v-row>
              </v-img>
            </v-card>
          </v-col>
        </transition-group>
      </v-container>
    </v-col>

    <v-dialog v-model="detailDialog">
      <v-card max-width="1920">
        <v-img :src="detailUrl" :width="detailWidth" />
      </v-card>
    </v-dialog>
  </v-row>
</template>

<style lang="scss" scoped>
.card-txt {
  text-shadow: 2px 2px 4px rgba(black, 0.7);
}
</style>
