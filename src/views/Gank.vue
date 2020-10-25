<template>
  <v-row justify="center">
    <v-col cols="10" lg="5" md="6" sm="7" xl="4">
      <ValidationObserver ref="observer" v-slot="{ reset }">
        <v-form @submit.native.prevent>
          <ValidationProvider name="api" rules="required" v-slot="{ errors }">
            <v-text-field
              :append-icon="errors.length ? 'mdi-restore' : ''"
              :error-messages="errors"
              :hint="$t('views.gank.hint')"
              @click:append="reset"
              @keyup.enter.stop="sendAjax"
              clearable
              counter
              label="API"
              outlined
              required
              v-model.trim="api"
            />
          </ValidationProvider>
        </v-form>
      </ValidationObserver>
    </v-col>

    <template v-if="Array.isArray(results)">
      <v-col
        :key="`gank-res${index}`"
        cols="10"
        v-for="(res, index) of results"
      >
        {{ res }}

        <v-img :src="res.image" height="120" v-if="res.image" />
      </v-col>
    </template>

    <v-col cols="10" v-else>{{ results }} </v-col>
  </v-row>
</template>

<script lang="ts">
import { Action } from "vuex-class";
import { Component, Ref, Vue } from "vue-property-decorator";
import { ValidationObserver, ValidationProvider } from "vee-validate";

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
  },
})
export default class Gank extends Vue {
  @Ref()
  readonly observer: any;

  api = "";

  results = [];

  @Action
  readonly getAjax!: (url: string) => Promise<any>;

  async sendAjax(): Promise<void> {
    const valided = await this.observer.validate();

    if (!valided) return;

    const { data } = await this.getAjax(this.api);

    this.results = data;
  }
}
</script>
