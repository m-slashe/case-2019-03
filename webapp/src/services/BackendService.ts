import axios, { AxiosResponse } from "axios";
import { Medicine, Interaction, History } from "@/types";

export class BackendService {
  private static client = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL
  });

  public static addItem(path: string, name: string) {
    return this.client.post(path, {
      name
    });
  }

  public static getPatients(params?: any) {
    return this.client.get("patients", {
      params
    });
  }

  public static addPatient(patient: string) {
    return this.addItem("patients", patient);
  }

  public static getDoctors(params?: any) {
    return this.client.get("doctors", {
      params
    });
  }

  public static addDoctor(doctor: string) {
    return this.addItem("doctors", doctor);
  }

  public static getMedicines(params?: any) {
    return this.client.get<Medicine[]>("medicines", {
      params
    });
  }

  public static getHistorys(params?: any) {
    return this.client.get<History[]>("historys", {
      params
    });
  }

  public static addHistory(history: History) {
    return this.client.post("historys", history);
  }

  public static async getInteractions(
    medicines: Medicine[]
  ): Promise<Interaction[]> {
    let farmacos = medicines.reduce(
      (acc: string[], med: Medicine) => acc.concat(med.Farmacos),
      []
    );
    let combinations: Array<{
      Farmaco1: string;
      Farmaco2: string;
    }> = [];
    farmacos.forEach((farmaco1: string, index1: number) => {
      farmacos.forEach((farmaco2: string, index2: number) => {
        if (farmaco1 !== farmaco2) {
          combinations.push({
            Farmaco1: farmaco1,
            Farmaco2: farmaco2
          });
        }
      });
    });
    let promises = [];
    for (let combination of combinations) {
      promises.push(
        this.client.get("interactions", {
          params: combination
        })
      );
    }
    let results = await Promise.all(promises);
    let interactions = results.reduce(
      (acc: Interaction[], result: AxiosResponse<Interaction>) => {
        return acc.concat(result.data);
      },
      []
    );
    return interactions;
  }
}
