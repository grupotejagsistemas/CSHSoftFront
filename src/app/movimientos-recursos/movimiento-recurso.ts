import { TipoMovimiento } from './tipoMovimiento';

export class MovimientoRecurso {
    id: number;
    descripcion: string;
    cantidad: string;
    donante: string;
    tipoMovimiento: TipoMovimiento[];
    fecha: Date;

    constructor (){

    }

    public static build(){
        const movRec = new MovimientoRecurso();
            movRec.id = 0; 
            movRec.descripcion = "";
            movRec.cantidad = "";
            movRec.donante = "";
            movRec.tipoMovimiento = {id: 0, descripcion: ""}
            movRec.fecha = null;

            return movRec;
        
    }
}
