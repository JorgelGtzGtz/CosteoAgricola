export class Fertilizantes {
    fert_id: number;
    fert_desc: string;
    tipo_insumo ?: number;
    fert_estado ?: number;
    fert_funcion : string;
    fert_N ?: number;
    fert_P ?: number;
    fert_K ?: number;
    fert_S ?: number;
    fert_otrasComp :string;
    fert_unidad ?: number;
    fert_costoProm ?: number;
    fert_existencia ?: number;
    fert_status ?: boolean;
    fert_inventariable ?: boolean;
    fert_obs : string;

    constructor()
    {
      this.tipo_insumo = 2;
      this.fert_existencia = 0;
      this.fert_costoProm = 0;
    }
}