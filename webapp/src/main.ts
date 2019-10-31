import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { Patient } from "./types";

Vue.config.productionTip = false;

type Store = {
  patient: Patient | null;
  history: History | null;
  setCurrentPatient: (client: Patient) => void;
  setCurrentHistory: (history: History) => void;
  getCurrentSelected: () => Patient | History | null;
};

let store: Store = {
  patient: null,
  setCurrentPatient(patient: Patient) {
    this.history = null;
    this.patient = patient;
  },
  history: null,
  setCurrentHistory(history: History) {
    this.patient = null;
    this.history = history;
  },
  getCurrentSelected(): Patient | History | null {
    return this.patient || this.history;
  }
};

new Vue({
  router,
  //@ts-ignore
  vuetify,
  data: {
    store
  },
  render: h => h(App)
}).$mount("#app");
