export type Medicine = {
  IdMedicamento: number;
  Nome: string;
  Farmaco: null;
  Farmacos: string[];
  Concentracao: string;
  Unidade: string;
  TipoMedicamento: string;
  FormaFarmaceutica: string;
  ViaAdministracao: string;
  CodigoATC: string;
  UsoInterno: boolean;
  Antimicrobiano: boolean;
  Bula: string;
  Portaria344: string;
  ControleEspecial: boolean;
  TISS: string;
  MIP: boolean;
  Label: string;
  Unificado: null;
};

export type Interaction = {
  Farmaco1: string;
  Farmaco2: string;
  Nome: string;
  Descricao: string;
};

export type History = {
  name: string;
  patientId: number;
  doctorId: number;
  medicines: number[];
};

export type Patient = {
  id: number;
  name: string;
};

export type Doctor = {
  id: number;
  name: string;
};
