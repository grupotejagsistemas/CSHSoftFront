export class Veterinaria {
    id: number;
    razonSocial: string;
    horarioAtencion: string;
    direccion: string;
    internacion: string;
    observacion: string;

constructor () {

}

public static build(){
    const veterinaria = new Veterinaria();
    veterinaria.id = null;
    veterinaria.razonSocial = "";
    veterinaria.horarioAtencion = "";
    veterinaria.direccion = "";
    veterinaria.internacion = "";
    veterinaria.observacion = "";

    return veterinaria;
}
}