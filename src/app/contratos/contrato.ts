import { Adoptante } from './adoptante';
import { Mascota } from './mascota';

export class Contrato {
    idContrato: number;
    adoptante: Adoptante;
    mascota: Mascota;
    nuevoNombre: string;

    public static build(){
        const contrato = new Contrato();
        contrato.idContrato = null; 
        contrato.adoptante   = {id: 0, nombreCompleto: ""};
        contrato.mascota= {id: 0, nombre: ""};
        contrato.nuevoNombre = ""

        return contrato;
    }
}
