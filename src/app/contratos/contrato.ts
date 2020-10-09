export class Contrato {
    id: number;
    nombreAdoptante: string;
    nombreMascota: string;
    nuevoNombreMascota: string;

    public static build(){
        const contrato = new Contrato();
        contrato.id = null;
        contrato.nombreAdoptante = "";
        contrato.nombreMascota= "";
        contrato.nuevoNombreMascota = ""

        return contrato;
    }
}
