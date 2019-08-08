<template>
  <v-list expand>
    <template v-for="item of menus">
      <v-subheader
        :key="`siderbar-menu${item.id}`"
        class="text-truncate"
        v-if="item.label"
        v-text="item.name[$i18n.locale]"
      />

      <v-list-group
        :group="`/${item.route}/`"
        :key="`siderbar-menu${item.id}`"
        :prepend-icon="item.icon"
        v-else-if="Array.isArray(item.children)"
      >
        <template #activator>
          <v-list-item-title v-text="item.name[$i18n.locale]" />
        </template>

        <template v-for="subitem of item.children">
          <v-list-group
            :group="`/${item.route}/${subitem.route}/`"
            :key="`siderbar-menu${subitem.id}`"
            prepend-icon="mdi-chevron-up"
            sub-group
            v-if="Array.isArray(subitem.children)"
          >
            <template #activator>
              <v-list-item-title v-text="subitem.name[$i18n.locale]" />
            </template>

            <v-list-item
              :key="`siderbar-menu${leaf.id}`"
              :to="`/${item.route}/${subitem.route}/${leaf.route}`"
              active-class="primary white--text"
              v-for="leaf of subitem.children"
            >
              <v-list-item-action v-if="leaf.icon">
                <v-icon v-text="leaf.icon" />
              </v-list-item-action>

              <v-list-item-title v-text="leaf.name[$i18n.locale]" />
            </v-list-item>
          </v-list-group>

          <v-list-item
            :key="`siderbar-menu${subitem.id}`"
            :to="`/${item.route}/${subitem.route}`"
            active-class="primary white--text"
            v-else
          >
            <v-list-item-action v-if="subitem.icon">
              <v-icon v-text="subitem.icon" />
            </v-list-item-action>

            <v-list-item-title v-text="subitem.name[$i18n.locale]" />
          </v-list-item>
        </template>
      </v-list-group>

      <v-list-item
        :key="`siderbar-menu${item.id}`"
        :to="`/${item.route}`"
        active-class="primary white--text"
        v-else
      >
        <v-list-item-action v-if="item.icon">
          <v-icon v-text="item.icon" />
        </v-list-item-action>

        <v-list-item-title>{{ item.name[$i18n.locale] }}</v-list-item-title>
      </v-list-item>
    </template>
  </v-list>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Global } from "typings";

@Component
export default class SidebarMenu extends Vue {
  @Prop({ type: Array, default: () => [] })
  readonly menus!: Global.Menu[];
}
</script>
