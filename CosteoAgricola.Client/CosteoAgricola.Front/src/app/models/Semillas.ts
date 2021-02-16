export class Semillas {
    sem_ID: number;
    sem_desc: string;
    sem_unidad?: number;
    tipo_insumo?: number;
    sem_upm?: number;
    sem_pm?: number;
    sem_variedad: string;
    sem_costoProm?: number;
    sem_existencia?: number;
    sem_status: boolean;
    sem_inventariable: boolean;
    sem_obs: string;

    
    constructor()
    {
      this.tipo_insumo = 1;
      this.sem_existencia = 0;
      this.sem_costoProm = 0;
    }
    
  }
  