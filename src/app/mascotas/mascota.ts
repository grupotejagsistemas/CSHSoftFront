import { EstadoMascota } from './estadoMascota';

export class Mascota {
    id: number;
    nombre: string;
    fechaNacimiento: number;
    particularidadesFisicas: string;
    sexo: string;
    fotoMascota: string;
    fechaRescate: Date;
    lugarRescate: string;
    descripcionRescate: string;
    especie: string;
    estado: string;
    estadoMascota: EstadoMascota;

    constructor(){ }

    public static build(){
        const mascota = new Mascota();
        mascota.id = null; 
        mascota.nombre = "";
        mascota.fechaNacimiento= null;
        mascota.particularidadesFisicas= "";
        mascota.sexo= "";
        mascota.fotoMascota= "";
        mascota.fechaRescate= null;
        mascota.lugarRescate= "";
        mascota.descripcionRescate= "";
        mascota.especie= "";
        mascota.estado="";
        mascota.estadoMascota = {id: 0, descripcion: ''};
        
        return mascota;
    }
}
