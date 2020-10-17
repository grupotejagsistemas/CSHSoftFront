export class Adoptante {
    id: number;
    nombreCompleto: string;

    public static build(){
        const adoptante = new Adoptante();
        adoptante.id = 0;
        adoptante.nombreCompleto = "";
    }
}