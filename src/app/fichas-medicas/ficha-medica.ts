import { Mascota } from './mascota';
import {Veterinaria} from './veterinaria';

export class FichaMedica {
    id: number; 
    fecha: string; 
    desparasitacion: string;
    nombreProducto: string;
    vacuna: string; 
    nombreVacuna: string; 
    diagnostico: string; 
    idMascota: number[];
    idVeterinaria: number[]; 
    tratamiento: string; 
    descripcionTratamiento: string;

    constructor() {} 

    public static build(){
        const fichaMedica = new FichaMedica();
        fichaMedica.id = null;
        fichaMedica.desparasitacion = "";
        fichaMedica.nombreProducto= "";
        fichaMedica.vacuna = "";
        fichaMedica.nombreVacuna= ""; 
        fichaMedica.diagnostico= ""; 
        fichaMedica.idMascota= null;
        fichaMedica.idVeterinaria= null; 
        fichaMedica.tratamiento= ""; 
        fichaMedica.descripcionTratamiento= "";

        return fichaMedica;
    }
}