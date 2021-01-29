export class Fertilizantes{
fert_id: number;
fert_desc: string;
tipo_insumo?: number;
fert_estado?: number;
fert_funcion: string;
fert_N?: number;
fert_P?: number;
fert_K?: number;
fert_S?: number;
fert_otrasComp: string;
fert_unidad?: number;
fert_costoProm?: number;
fert_existencia?: number;
fert_status?: boolean;
fert_inventariable?: boolean;
fert_obs: string;

constructor()
{
    this.fert_id = 0;
    this.fert_desc = '';
    this.tipo_insumo = 0;
    this.fert_estado = 0;
    this.fert_funcion = '';
    this.fert_N = 0;
    this.fert_P = 0;
    this.fert_K = 0;
    this.fert_S = 0;
    this.fert_otrasComp = '';
    this.fert_unidad = 0;
    this.fert_costoProm = 0;
    this.fert_existencia = 0;
    this.fert_status = true;
    this.fert_inventariable = true;
    this.fert_obs = '';

}
}
