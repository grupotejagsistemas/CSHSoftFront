import { Veterinaria } from './veterinaria';

export class Voluntario {
    id: number;
    nombrecompleto: string;
    telefono: string;
    direccion: string ;
    idVeterinariaCercana: Veterinaria;
    localidad: string;
    transito: string;
    traslado: string;
    presencial: string;
}
