<template>
  <div class="content-wrapper">
    <div class="content">
      <async-search
        v-model="history"
        :on-search-items="onHistorySearch"
        @change="onHistoryChange($event)"
        item-text="name"
        item-value="id"
        label="Digite o nome do histórico desejado"
        :hide-no-data="true"
      ></async-search>
      <p class="label">OU</p>
      <async-search
        v-model="patient"
        :on-search-items="onPatientSearch"
        @change="onPatientChange($event)"
        item-text="name"
        item-value="id"
        label="Digite o nome do paciente que esta procurando ou cadastre um novo!"
      ></async-search>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Patient, History } from "../types";
import { BackendService } from "../services/BackendService";
import { Utils } from "../services/Utils";
import AsyncSearch from "../components/AsyncSearch.vue";
@Component({
  components: {
    AsyncSearch
  }
})
export default class extends Vue {
  private patient: Patient | string | null = "";
  private history: History | string = "";

  private onHistoryChange(history: History) {
    if (Utils.isHistory(history)) {
      this.$root.$data.store.setCurrentHistory(history);
      this.$router.push("detail");
    }
  }

  private async onPatientChange(event: string | Patient) {
    let patient = event;
    if (!Utils.isPatient(patient)) {
      patient = (await BackendService.addPatient(patient)).data;
    }
    this.$root.$data.store.setCurrentPatient(patient);
    this.$router.push("detail");
  }

  onPatientSearch(value: string) {
    return BackendService.getPatients({
      name_like: value
    });
  }

  onHistorySearch(value: string) {
    return BackendService.getHistorys({
      name_like: value
    });
  }
}
</script>

<style lang="scss" scoped>
.content-wrapper {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
}

.label {
  margin: 0 auto;
}
</style>
