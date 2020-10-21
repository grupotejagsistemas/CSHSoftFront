export class Recordatorio {
    idRecordatorio: number; 
    descripcionRecordatorio: string;
    fecha: Date;

    constructor (){ }

    public static build(){
        const recordatorio = new Recordatorio()
            recordatorio.idRecordatorio = null;
            recordatorio.descripcionRecordatorio = "";
            recordatorio.fecha = null;

            return recordatorio;
        }
}
