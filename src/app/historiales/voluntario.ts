export class Voluntario {
    id: number; 
    nombrecompleto: string;

    public static build(){
        const voluntario = new Voluntario();
        voluntario.id = 0;
        voluntario.nombrecompleto = "";
    }
}
