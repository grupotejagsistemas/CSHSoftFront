export class Auditoria {
    id: number;
    accion: string;
    usuario: string;
    fecha: Date;

    constructor(){

    }

    public static Build(){
        const auditoria = new Auditoria();
        auditoria.id = null;
        auditoria.accion = "";
        auditoria.usuario = "";
        auditoria.fecha = null;
    }
}
