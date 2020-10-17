import {TipoMovimiento} from '../movimientos-recursos/tipoMovimiento';

export class MovimientoMonetario {

    id: number;
    monto: string;
    medio: string;
    autor: string;
    tipoMovimiento: TipoMovimiento;
    fecha: Date;
    
    constructor (){}
    
    public static build(){
        const movimientoMonetario = new MovimientoMonetario();
        movimientoMonetario.id = 0;
        movimientoMonetario.monto = "";
        movimientoMonetario.medio = "";
        movimientoMonetario.autor = "";
        movimientoMonetario.tipoMovimiento = {id: 0, descripcion: ""}
        movimientoMonetario.fecha = null;

    }
}