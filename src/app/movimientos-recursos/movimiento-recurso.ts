import {TipoMovimiento} from './tipoMovimiento';

export class MovimientoRecurso {
    id: number;
    descripcion: string;
    cantidad: string;
    donante: string;
    tipoMovimiento: TipoMovimiento;
    fecha: Date;

    constructor (){}

    public static build(){
        const movimientoRecurso = new MovimientoRecurso();
        movimientoRecurso.id = 0;
        movimientoRecurso.descripcion = "";
        movimientoRecurso.cantidad = "";
        movimientoRecurso.donante = "";
        movimientoRecurso.tipoMovimiento = {id: 0, descripcion: ""}
        movimientoRecurso.fecha = null;

        return movimientoRecurso;
    }
}
