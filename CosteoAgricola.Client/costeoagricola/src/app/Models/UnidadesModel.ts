export class Unidades{
unidad_id: number;
unidad_desc: string;
unidad_abrev: string;
unidad_status?: boolean;
unidad_tipo: number;

constructor()
{
    this.unidad_id = 0;
    this.unidad_desc = '';
    this.unidad_abrev = '';
    this.unidad_status = true;
    this.unidad_tipo = 0;
}
}