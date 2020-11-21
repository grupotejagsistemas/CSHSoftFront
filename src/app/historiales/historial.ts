import {Mascota } from './mascota';
import {Voluntario} from './voluntario';

export class Historial {
    id: number;
    idVoluntario: number;
    idMascota: number;
    nombreVoluntario: Voluntario;
    domicilioVoluntario: string; 
    nombreMascota: Mascota;
    fecha: Date;

    constructor() {}

    public static build(){
        const historial = new Historial();
        historial.id = null,
        historial.idVoluntario= null,
        historial.idMascota = null,
        historial.nombreVoluntario = {id: 0, nombrecompleto: ""},
        historial.domicilioVoluntario = "",
        historial.nombreMascota = {id: 0, nombre: ""},
        historial.fecha = null

        return historial;
    }
}
