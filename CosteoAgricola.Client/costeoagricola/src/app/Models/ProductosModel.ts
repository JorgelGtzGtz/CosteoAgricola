export class Productos{
prod_id: number;
prod_desc: string;
tipo_insumo?: number;
prod_unidad?: number;
prod_costoProm?: number;
prod_existencia?: number;
prod_costeo?: boolean;
prod_status?: boolean;
prod_inventariable?: boolean;
prod_obs: string;

constructor()
{
    this.prod_id = 0;
    this.prod_desc = '';
    this.tipo_insumo = 0;
    this.prod_unidad = 0;
    this.prod_costoProm = 0;
    this.prod_existencia = 0;
    this.prod_costeo = true;
    this.prod_status = true;
    this.prod_inventariable = true;
    this.prod_obs = '';
}
}