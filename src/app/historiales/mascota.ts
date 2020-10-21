export class Mascota {
    id: number; 
    nombre: string;

    public static build(){
        const mascota = new Mascota();
        mascota.id = 0;
        mascota.nombre = "";
    }
}
