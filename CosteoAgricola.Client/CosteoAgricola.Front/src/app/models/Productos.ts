export class Productos {
    prod_id: number;
    prod_desc: string;
    tipo_insumo?: number;
    prod_unidad?: number;
    prod_costoProm?: number;
    prod_existencia?: number;
    prod_costeo?: boolean;
    prod_status: boolean;
    prod_inventariable: boolean;
    prod_obs: string;

    
    constructor()
    {
      this.tipo_insumo = 4;
    }
    
  }