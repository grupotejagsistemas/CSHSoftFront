export class Contrato {
    idContrato: number;
    adoptante: string;
    mascota: string;
    nuevoNombre: string;

    public static build(){
        const contrato = new Contrato();
        contrato.idContrato = null; 
        contrato.adoptante   = "";
        contrato.mascota= "";
        contrato.nuevoNombre = ""

        return contrato;
    }
}
