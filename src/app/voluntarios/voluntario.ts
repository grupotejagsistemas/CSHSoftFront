import { Veterinaria } from './veterinaria';

export class Voluntario {
    idVoluntario: number;
    nombreCompleto: string;
    telefono: string;
    direccion: string ;
    idVeterinariaCercana: Veterinaria;
    zona: string;
    transito: string;
    traslado: string;
    presencial: string;
}
