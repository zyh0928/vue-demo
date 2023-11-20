<script lang="ts" setup>
import useGlobalStore from "#/global";

interface EnvType {
  bg: string;
  key: string;
  value: string;
}

const globalStore = useGlobalStore();

const { getRandomColor } = globalStore;

const api = ref("");
const data = ref<Recordable>({});

const env = import.meta.env;

const props = computed(() => {
  const res: EnvType[] = [];

  Object.keys(env).forEach((key) =>
    res.push({
      bg: "bg-" + getRandomColor(),
      key,
      value: env[key],
    }),
  );

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
</script>

<template>
  <v-row>
    <v-col class="text-h3 text-primary" cols="12">
      {{ $t("views.about.title") }}
    </v-col>

    <v-col cols="4">
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

      <v-row>
        <template v-for="({ key, value, bg }, idx) of props" :key="`env${key}`">
          <v-col
            :class="[idx ? 'mt-4' : '', bg]"
            class="text-end env-key"
            cols="6"
          >
            <span v-text="key" />
            <span class="ml-2">:</span>
          </v-col>

          <v-col
            :class="[idx ? 'mt-4' : '', bg]"
            class="rounded-e-pill env-value"
            cols="6"
          >
            <span v-text="value" />
          </v-col>
        </template>
      </v-row>
    </v-col>

    <v-col class="pl-8" cols="8">
      <pre class="text-h6 elevation-9 preview">{{ data }}</pre>
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

// .env {
//   @for $i from 1 through 20 {
//     &-value:nth-of-type(#{$i}) {
//       animation: slide 4s infinite 200ms * $i linear;
//     }
//   }
// }

.preview {
  border-radius: 24px;
  background: rgb(var(--v-theme-info));
  padding: 24px;
  overflow: hidden;
  color: rgb(var(--v-theme-on-info));
  font-weight: 300;
  text-overflow: ellipsis;
}
</style>
