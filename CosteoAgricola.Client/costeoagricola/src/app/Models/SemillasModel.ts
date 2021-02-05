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
  sem_status?: boolean;
  sem_inventariable?: boolean;
  sem_obs: string;

constructor()
{
    this.sem_ID = 0;
    this.sem_desc = '';
    this.sem_unidad = 0;
    this.tipo_insumo = 0;
    this.sem_upm = 0;
    this.sem_pm = 0;
    this.sem_variedad = '';
    this.sem_costoProm = 0;
    this.sem_existencia = 0;
    this.sem_status = true;
    this.sem_inventariable = true;
    this.sem_obs = '';
}
  }

