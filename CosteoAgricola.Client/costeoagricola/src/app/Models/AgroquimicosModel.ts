export class Agroquimicos{
agrog_id: number;
agroq_nomComercial: string;
tipo_insumo?: number;
agroq_estado?: number;
agroq_tipo?: number;
agroq_formulacion?: number;
agroq_unidad?: number;
agroq_descInertes: string;
agroq_concInertes?: number;
agroq_registro: string;
agroq_reentrada?: number;
agroq_unidadReent?: number;
agroq_intervSeg?: number;
agroq_unidadSeg?: number;
agroq_costoProm?: number;
agroq_existencia?: number;
agroq_status?: boolean;
agroq_inventariable?: boolean;
agroq_obs: string;

constructor() {
    this.agrog_id = 0;
    this.agroq_nomComercial = '';
    this.tipo_insumo = 0;
    this.agroq_estado = 0;
    this.agroq_tipo = 0;
    this.agroq_formulacion = 0;
    this.agroq_descInertes = '';
    this.agroq_concInertes = 0;
    this.agroq_registro = '';
    this.agroq_reentrada = 0;
    this.agroq_unidadReent = 0;
    this.agroq_unidadSeg = 0;
    this.agroq_costoProm = 0;
    this.agroq_existencia = 0;
    this.agroq_status = true;
    this.agroq_inventariable = true;
    this.agroq_obs = '';
}
}