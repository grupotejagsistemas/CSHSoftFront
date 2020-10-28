export class Mascota {
    id: number; 
    nombre: string;

    public static build(){
        const mascota = new Mascota();
        mascota.id = null;
        mascota.nombre = "";
    }
}
