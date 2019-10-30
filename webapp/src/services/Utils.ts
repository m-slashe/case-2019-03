import { History, Client, Doctor } from "../types";

export class Utils {
  public static isHistory(obj: any): obj is History {
    return obj && typeof obj === "object" && obj.hasOwnProperty("clientId");
  }

  public static isClient(obj: any): obj is Client {
    return typeof obj === "object";
  }

  public static isDoctor(obj: any): obj is Doctor {
    return typeof obj === "object";
  }
}
