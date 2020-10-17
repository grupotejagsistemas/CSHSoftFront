export class TipoMovimiento {
    id: number;
    descripcion: string; 


    public static build(){
        const tipoMovimiento = new TipoMovimiento();
        tipoMovimiento.id = null;
        tipoMovimiento.descripcion = "";

        return tipoMovimiento;
    }
}