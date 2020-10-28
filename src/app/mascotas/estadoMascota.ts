export class EstadoMascota {
    id: number; 
    descripcion: string;


    public static build(){
        const est = new EstadoMascota();
        est.id = 0;
        est.descripcion = "";

        return est;
    }
}