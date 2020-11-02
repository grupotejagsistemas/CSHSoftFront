import { Veterinaria } from './veterinaria';

export class Voluntario {
    id: number;
    nombrecompleto: string;
    telefono: string;
    direccion: string ;
    idveterinarias: any [] = [];
    localidad: string;
    transito: string;
    traslado: string;
    presencial: string;

    constructor (){

    }

    public static build(){
        const voluntario = new Voluntario();
        voluntario.id = null;
        voluntario.nombrecompleto = '';
        voluntario.telefono = '';
        voluntario.direccion = ''; 
        voluntario.idveterinarias =  [] = []; 
        voluntario.localidad = ''; 
        voluntario.transito = '';
        voluntario.traslado ='';
        voluntario.presencial = ''; 

        return voluntario;
    }
}



