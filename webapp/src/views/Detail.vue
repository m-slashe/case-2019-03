<template>
  <v-container>
    <v-row>
      <v-col>
        <async-search
          v-model="history"
          :on-search-items="onHistorySearch"
          @on-items-load="onHistoryLoad($event)"
          item-text="name"
          item-value="id"
          label="Histórico"
          hide-no-data
        ></async-search>
      </v-col>
      <v-col class="centered-button">
        <v-btn :disabled="readOnly" @click="addHistory()">Salvar</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <async-search
          v-model="client"
          :on-search-items="onClientSearch"
          item-text="name"
          item-value="id"
          label="Paciente"
          @change="onClientChange($event)"
          :disabled="readOnly"
        ></async-search>
      </v-col>
      <v-col>
        <async-search
          v-model="doctor"
          :on-search-items="onDoctorSearch"
          item-text="name"
          item-value="id"
          label="Medico"
          @change="onDoctorChange($event)"
          :disabled="readOnly"
        ></async-search>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <async-search
          v-model="medicine"
          :on-search-items="onMedicineSearch"
          @on-items-load="onItemsLoad"
          item-text="Label"
          item-value="IdMedicamento"
          label="Medicamentos"
          :disabled="readOnly"
        ></async-search>
      </v-col>
      <v-col class="centered-button">
        <v-btn :disabled="readOnly" @click="addMedicine(medicine)">Adicionar</v-btn>
      </v-col>
    </v-row>
    <v-divider />
    <v-row>
      <div v-for="(intera, index) in interactions" v-bind:key="index">
        <span class="interaction-info">
          <v-icon :color="getColor(intera.Nome)">mdi-skull</v-icon>
          <p>{{ intera.Nome }}</p>
        </span>
        <p class="interaction-desc">{{ intera.Descricao }}</p>
        <v-divider />
      </div>
    </v-row>
    <v-row>
      <v-list class="medicine-list">
        <v-list-item
          class="item"
          v-for="(med, index) in medicines"
          v-bind:key="index"
          :disabled="readOnly"
        >
          <v-list-item-avatar>
            <v-img
              :src="med.Bula || 'https://smartfar.com.br/loja2/media/catalog/product/cache/1/small_image/264x246/d15e909c169f361b245018b95f963ffd/r/e/remedio_2_2.jpg'"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="med.Nome"></v-list-item-title>
            <v-list-item-subtitle
              v-text="med.ViaAdministracao + ' ' + med.Concentracao + med.Unidade"
            ></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text class="interaction-alerts">
              <v-icon
                v-for="(seila, index) in getMedicineInteractions(med)"
                :color="seila.color"
                :key="index"
              >mdi-skull</v-icon>
            </v-list-item-action-text>
            <v-btn icon>
              <v-icon color="red" @click="removeMedicine(med)">mdi-close</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Utils } from "../services/Utils";
import { BackendService } from "../services/BackendService";
import { Client, Doctor, Medicine, Interaction, History } from "../types";
import AsyncSearch from "../components/AsyncSearch";
@Component({
  components: {
    AsyncSearch
  }
})
export default class extends Vue {
  private client: Client | string | null = "";
  private doctor: Doctor | string | null = "";
  private medicine: Medicine | null = null;
  private medicines: Medicine[] = [];
  private interactions: Interaction[] = [];
  private history: History | string | null = "";
  private filteredMedicines: Medicine[] = [];

  created() {
    let selected = this.$root.$data.store.getCurrentSelected();
    if (Utils.isHistory(selected)) {
      this.history = selected;
    } else if (Utils.isClient(selected)) {
      this.client = selected;
    }
  }

  get readOnly() {
    return this.history === this.$root.$data.store.getCurrentSelected();
  }

  getColor(nivel: string) {
    let colors = {
      Leve: "green",
      Moderada: "yellow",
      Grave: "red"
    };
    return colors[nivel];
  }

  getMedicineInteractions(med: Medicine) {
    return this.interactions
      .filter(interaction => {
        return med.Farmacos.some(farmaco => {
          return [interaction.Farmaco1, interaction.Farmaco2].includes(farmaco);
        });
      })
      .map(interaction => ({ color: this.getColor(interaction.Nome) }));
  }

  async addHistory() {
    if (
      Utils.isClient(this.client) &&
      Utils.isDoctor(this.doctor) &&
      typeof this.history === "string"
    ) {
      let history = {
        name: this.history,
        date: new Date(),
        clientId: this.client.id,
        doctorId: this.doctor.id,
        medicines: this.medicines.map(
          (medicine: Medicine) => medicine.IdMedicamento
        )
      };
      const response = await BackendService.addHistory(history);
      this.history = response.data;
      this.$root.$data.store.setCurrentHistory(this.history);
    }
  }

  removeMedicine(medicine: Medicine) {
    const index = this.medicines.indexOf(medicine);
    this.medicines.splice(index, 1);
    this.loadInteraction();
  }

  addMedicine(medicine: Medicine) {
    this.medicines.push(medicine);
    this.medicine = null;
    this.loadInteraction();
  }

  onItemsLoad(items: Medicine[]) {
    this.filteredMedicines = items;
  }

  async onClientChange(client: Client | string) {
    if (!Utils.isClient(client)) {
      this.client = (await BackendService.addUser(client)).data;
    }
  }

  async onDoctorChange(doctor: Doctor | string) {
    if (!Utils.isDoctor(doctor)) {
      this.doctor = (await BackendService.addUser(doctor)).data;
    }
  }

  async onHistoryLoad(items: History[]) {
    if (Utils.isHistory(this.history)) {
      this.$root.$data.store.setCurrentHistory(this.history);
      let promises = [];
      promises.push(
        BackendService.getUsers({
          id: this.history.clientId
        })
      );
      promises.push(
        BackendService.getDoctors({
          id: this.history.doctorId
        })
      );
      let medicineRegExp = `^${this.history.medicines.join("$|^")}$`;
      promises.push(
        BackendService.getMedicines({
          IdMedicamento_like: medicineRegExp
        })
      );
      let [userResponse, doctorResponse, medicineResponse] = await Promise.all(
        promises
      );
      this.client = userResponse.data[0];
      this.doctor = doctorResponse.data[0];
      this.medicines = medicineResponse.data;
      this.loadInteraction();
    }
  }

  loadInteraction() {
    return BackendService.getInteractions(this.medicines).then(
      (interactions: Interaction[]) => {
        this.interactions = interactions;
        console.log(this.interactions);
      }
    );
  }

  onHistorySearch(value: string) {
    return BackendService.getHistorys({
      name_like: value
    });
  }

  onClientSearch(value: string) {
    return BackendService.getUsers({
      name_like: value
    });
  }

  onMedicineSearch(value: string) {
    return BackendService.getMedicines({
      Label_like: value
    });
  }

  onDoctorSearch(value: string) {
    return BackendService.getDoctors({
      name_like: value
    });
  }
}
</script>

<style lang="scss" scoped>
.medicine-list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  .item {
    max-width: 50%;
  }
}

.centered-button {
  display: flex;
  align-items: center;
}

.interaction-info {
  display: flex;
  align-items: center;

  p {
    margin: 0;
  }
}

.interaction-alerts {
  margin-right: 6px;
}
</style>