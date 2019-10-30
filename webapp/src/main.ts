import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { Client } from "./types";

Vue.config.productionTip = false;

type Store = {
  client: Client | null;
  history: History | null;
  setCurrentClient: (client: Client) => void;
  setCurrentHistory: (history: History) => void;
  getCurrentSelected: () => Client | History | null;
};

let store: Store = {
  client: null,
  setCurrentClient(client: Client) {
    this.history = null;
    this.client = client;
  },
  history: null,
  setCurrentHistory(history: History) {
    this.client = null;
    this.history = history;
  },
  getCurrentSelected(): Client | History | null {
    return this.client || this.history;
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
