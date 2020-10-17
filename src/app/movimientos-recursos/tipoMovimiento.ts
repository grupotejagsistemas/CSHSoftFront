export class TipoMovimiento {
    id: number;
    descripcion: string; 

    constructor (){ }

    public static build(){
        const tipoMovimiento = new TipoMovimiento();
        tipoMovimiento.id = null;
        tipoMovimiento.descripcion = "";

        return tipoMovimiento;
    }
}