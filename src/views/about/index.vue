<script lang="ts" setup>
import { colors } from "~/variables.json";

interface EnvType {
  bg: string;
  key: string;
  value: string;
}

const env = import.meta.env;

const api = ref("");
const data = ref<Recordable>({});

const props = computed(() => {
  const res: EnvType[] = [];

  Object.keys(env).forEach((key) => {
    const bg = "bg-" + colors[Math.floor(Math.random() * colors.length)];

    res.push({
      bg,
      key,
      value: env[key],
    });
  });

  return res;
});

const sendRequest = async () => {
  if (!api.value) return;

  try {
    // const resp = await request.get(mapApi("jrsc", api.value));
    // data.value = resp;
  } catch (e) {
    const error = e as { [key: string]: unknown };

    const res: { [key: string]: unknown } = {};

    Object.keys(error).forEach((key) => {
      res[key] = error[key];
    });

    data.value = res;
  }
};

// ("animate__infinite");
</script>

<template>
  <v-row>
    <v-col cols="12">
      <div class="text-h3 text-primary pt-6 px-6">
        {{ $t("views.about.title") }}
      </div>
    </v-col>

    <v-col cols="4">
      <div
        v-for="({ key, value, bg }, idx) of props"
        :key="key"
        :class="[idx ? 'mt-4' : '', bg]"
        class="text-h6 rounded-e-pill"
      >
        {{ key }}: {{ value }}
      </div>
    </v-col>

    <v-col cols="8">
      <v-text-field
        v-model="api"
        :placeholder="$t('views.about.placeholder')"
        :rules="[
          (value) => !!value || $t('validations.required', { field: 'Api' }),
        ]"
        append-icon="mdi-exit-to-app"
        color="secondary"
        label="Ovooa Api"
        prepend-inner-icon="mdi-api"
        variant="underlined"
        @click:append="sendRequest"
      />
      <pre class="elevation-9 bg-info preview">{{ data }}</pre>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
@keyframes slide {
  0% {
    transform: translate3d(0, 0, 0);
  }

  12.5% {
    transform: translate3d(25px, 0, 0);
  }

  25% {
    transform: translate3d(0, 0, 0);
  }
}

.preview {
  border-radius: 12px;
  padding: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
