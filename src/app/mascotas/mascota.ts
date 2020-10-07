export class Mascota {
    id: number;
    nombre: string;
    fechaNacimiento: number;
    particularidadesFisica: string;
    sexo: string;
    fotoMascota: string;
    fechaRescate: Date;
    lugarRescate: string;
    descripcionRescate: string;
    especie: string;
    estado: string;

    constructor(){ }

    public static build(){
        const mascota = new Mascota();
        mascota.id = null; 
        mascota.nombre = "";
        mascota.fechaNacimiento= null;
        mascota.particularidadesFisica= "";
        mascota.sexo= "";
        mascota.fotoMascota= "";
        mascota.fechaRescate= null;
        mascota.lugarRescate= "";
        mascota.descripcionRescate= "";
        mascota.especie= "";
        mascota.estado= null;
        
        return mascota;
    }
}
