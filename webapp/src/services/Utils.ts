import { History, Patient, Doctor } from "../types";

export class Utils {
  public static isHistory(obj: any): obj is History {
    return obj && typeof obj === "object" && obj.hasOwnProperty("patientId");
  }

  public static isPatient(obj: any): obj is Patient {
    return typeof obj === "object";
  }

  public static isDoctor(obj: any): obj is Doctor {
    return typeof obj === "object";
  }
}
