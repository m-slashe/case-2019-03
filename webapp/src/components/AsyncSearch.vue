<template>
  <v-combobox
    v-bind:value="value"
    v-on:change="$emit('input', $event) && $emit('change', $event)"
    :search-input.sync="search"
    :loading="isLoading"
    :items="items"
    :item-text="itemText"
    :item-value="itemValue"
    :label="label"
    :disabled="disabled"
    clearable
    return-object
  >
    <template v-if="hideNoData" v-slot:no-data>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            Nenhum resultado encontrado "
            <strong>{{ search }}</strong>". Pressione
            <kbd>enter</kbd> para criar um novo
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-combobox>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
@Component
export default class extends Vue {
  private search: string = "";
  private isLoading = false;
  private items: any = [];
  @Prop() private disabled: boolean;
  @Prop() private value: any;
  @Prop() private onSearchItems!: any;
  @Prop() private itemText!: string;
  @Prop() private itemValue!: string;
  @Prop() private label: string;
  @Prop() private placeholder: string;
  @Prop() private hideNoData: boolean;

  @Watch("search")
  private async onSearch(value: string) {
    try {
      if (!value) {
        this.items = [];
      } else if (value.length >= 3) {
        this.isLoading = true;
        let response = await this.onSearchItems(value);
        this.items = response.data;
        this.$emit("on-items-load", this.items);
      }
    } finally {
      this.isLoading = false;
    }
  }
}
</script>