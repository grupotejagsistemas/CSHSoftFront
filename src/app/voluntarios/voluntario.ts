import { Veterinaria } from './veterinaria';

export class Voluntario {
    id: number;
    nombreCompleto: string;
    telefono: string;
    direccion: string ;
    idveterinarias: number[];
    localidad: string;
    transito: string;
    traslado: string;
    presencial: string;
  static nombrecompleto: any;

    constructor (){

    }

    public static build(){
        const voluntario = new Voluntario();
        voluntario.id = null;
        voluntario.nombreCompleto = '';
        voluntario.telefono = '';
        voluntario.direccion = ''; 
        voluntario.idveterinarias=  null; 
        voluntario.localidad = ''; 
        voluntario.transito = '';
        voluntario.traslado ='';
        voluntario.presencial = ''; 

        return voluntario;
    }
}



