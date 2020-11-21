import { Adoptante } from './adoptante';
import { Mascota } from './mascota';

export class Contrato {
    idContrato: number;
    idAdoptante: number;
    idMascota: Mascota;
    nuevoNombre: string;

    public static build(){
        const contrato = new Contrato();
        contrato.idContrato = null; 
        contrato.idAdoptante   = null;
        contrato.idMascota= null;
        contrato.nuevoNombre = ""

        return contrato;
    }
}
