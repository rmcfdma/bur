import type { IComponente } from "./IComponente";

export interface IUsuario {
    ID_USUARIOS: number | undefined;
    USERNAME: string;
    PASSWORD: string;
    DATA_INCLUSAO: Date | undefined;
    DATA_EXCLUSAO: Date | undefined;
    ID_COMPONENTES: number | undefined
  }