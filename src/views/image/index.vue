<script lang="ts" setup>
import { getList as getCats } from "$/cat";
import { getList as getDogs } from "$/dog";
import { getList as getGirls } from "$/girl";

interface Detail {
  dialog: boolean;
  url: string;
  width: number;
}

const loading = ref(!1);
const page = ref("girl");
const imgs = ref<string[]>([]);

const detail = reactive<Detail>({
  dialog: !1,
  url: "",
  width: 0,
});

const getImgs = async () => {
  loading.value = !0;
  switch (page.value) {
    case "girl": {
      const list = Array.from({ length: 8 }, () => getGirls());

      imgs.value = (await Promise.all(list)).map(
        ({ url }: Recordable<string>) => url,
      );
      break;
    }

    case "dog":
      imgs.value = await getDogs();
      break;

    case "cat":
      imgs.value = (await getCats()).map(({ url }: Recordable<string>) => url);
      break;
  }
  loading.value = !1;
};

const changePage = async (value: string) => {
  if (page.value === value) return;

  page.value = value;

  await getImgs();
};

onMounted(async () => {
  await getImgs();
});

const openDetail = (url: string) => {
  const img = new Image();

  img.src = url;

  img.addEventListener("load", () => {
    detail.width = img.width;
    detail.url = url;
    detail.dialog = !0;
  });
};
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-toolbar>
        <v-btn
          :loading="loading"
          color="primary"
          icon="mdi-refresh"
          @click="getImgs"
        />

        <v-btn-toggle
          :disabled="loading"
          :model-value="page"
          mandatory
          class="rounded-0"
          color="primary"
          variant="text"
          @update:model-value="changePage"
        >
          <v-btn class="text-none" value="girl">
            {{ $t("views.image.girl") }}
          </v-btn>

          <v-btn value="dog">{{ $t("views.image.dog") }}</v-btn>

          <v-btn value="cat">{{ $t("views.image.cat") }}</v-btn>
        </v-btn-toggle>
      </v-toolbar>
    </v-col>

    <v-col cols="12">
      <v-container v-if="imgs.length">
        <transition-group class="v-row v-row--dense" name="list" tag="div">
          <v-col
            v-for="(url, index) of imgs"
            :key="url"
            cols="12"
            lg="4"
            sm="6"
            xl="3"
          >
            <v-card hover @click.stop="openDetail(url)">
              <v-img :src="url" cover aspect-ratio="1">
                <template #placeholder>
                  <div class="h-100 d-flex justify-center align-center">
                    <v-progress-circular
                      indeterminate
                      color="primary"
                      size="48"
                      width="2"
                    />
                  </div>
                </template>

                <div class="h-100 d-flex justify-end align-end">
                  <div class="text-h5 card-txt">No. {{ index + 1 }}</div>
                </div>
              </v-img>
            </v-card>
          </v-col>
        </transition-group>
      </v-container>
    </v-col>

    <v-dialog
      v-model="detail.dialog"
      :width="detail.width"
      max-height="100vh"
      max-width="1200"
    >
      <v-card>
        <v-img :src="detail.url" cover />
      </v-card>
    </v-dialog>
  </v-row>
</template>

<style lang="scss" scoped>
.card-txt {
  margin: 16px;
  color: rgb(var(--v-theme-background));
  text-shadow: 0 0 2px rgba(var(--v-theme-on-background), 0.7);
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  transform: translateX(30px);
  opacity: 0;
}

.list-leave-active {
  position: absolute;
}
</style>
