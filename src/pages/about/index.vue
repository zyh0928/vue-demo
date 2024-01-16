<script lang="ts" setup>
import { debounce } from "lodash-es";

import useGlobalStore from "#/global";
import { corsRequest } from "$/request";
import { colors } from "~/variables.json";

interface EnvType {
  bg: string;
  key: string;
  value: string;
}

const { showSnackbar } = useGlobalStore();

const env = import.meta.env;
const required = JSON.stringify(["validations.required", { field: "Api" }]);
const rules = [(v?: string) => !!v || required];

const api = ref("https://3650000.xyz/view/url/tuwan");
const data = ref<KVMap>({});
const loading = ref(!1);

const envs = computed(() => {
  const res: EnvType[] = [];
  Object.keys(env).forEach((key) => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const bg = "bg-" + color;
    res.push({
      bg,
      key,
      value: env[key],
    });
  });
  return res;
});

const copyEnv = async (txt: string) => {
  await navigator.clipboard.writeText(txt);
  showSnackbar(txt, { color: "success" });
};

const sendRequest = debounce(async () => {
  if (!api.value) return;
  try {
    loading.value = !0;
    const code = encodeURIComponent(api.value);
    data.value = await corsRequest.get(code);
  } catch (error) {
    const res: { [key: string]: unknown } = {};
    if (error instanceof Error) {
      Object.keys(error).forEach((key) => {
        // @ts-expect-error
        res[key] = error[key];
      });
    }
    data.value = res;
  } finally {
    loading.value = !1;
  }
}, 500);
</script>

<template>
  <v-row>
    <v-col cols="12">
      <div class="text-h3 text-primary pt-4 px-4">
        {{ $t("pages.about.title") }}
      </div>
    </v-col>

    <v-col cols="12" md="5">
      <div class="text-h6 env">
        <template v-for="{ key, value, bg } of envs" :key="key">
          <div :class="[bg]" class="env-item key" v-text="key" />

          <div :class="[bg]" class="env-item value">
            <div class="flex-grow-1 text-truncate" v-text="value" />
          </div>

          <div :class="[bg]" class="env-item action">
            <v-icon size="24" @click="copyEnv(value)">mdi-content-copy</v-icon>
          </div>
        </template>
      </div>
    </v-col>

    <v-col cols="12" md="6">
      <v-text-field
        v-model.trim="api"
        :disabled="loading"
        :placeholder="$t('pages.about.placeholder')"
        :rules="rules"
        append-inner-icon="mdi-exit-to-app"
        color="secondary"
        variant="outlined"
        clearable
        @click:append-inner="sendRequest"
        @keypress.enter="sendRequest"
      >
        <template #message="{ message }">
          {{ $t(JSON.parse(message)[0], JSON.parse(message)[1]) }}
        </template>
      </v-text-field>

      <pre class="elevation-9 bg-info preview" v-text="data" />
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
$row-gap: 12px;
$spacing: 8px;

.env {
  display: grid;
  grid-template-columns: auto 1fr auto;
  row-gap: $row-gap;

  &-item {
    display: flex;
    align-items: center;
    padding-top: calc($spacing / 2);
    padding-bottom: calc($spacing / 2);
    height: 100%;

    &.key {
      justify-content: flex-end;
      padding-right: $spacing;
      padding-left: $spacing;
    }

    &.value {
      overflow: hidden;
    }

    &.action {
      border-radius: 0 $spacing $spacing 0;
      padding-right: $spacing;
      padding-left: $spacing;
    }
  }
}

.preview {
  margin-top: 2px;
  border-radius: $row-gap;
  padding: $row-gap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
