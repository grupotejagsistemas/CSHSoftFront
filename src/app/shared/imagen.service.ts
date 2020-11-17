import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  imageDetailList: AngularFireList<any>;

  constructor(private firebase : AngularFireDatabase) { }

  getImageDetailList(){
    this.imageDetailList = this.firebase.list('imageDetails');
  }

  insertImageDetails(objeto:any){
    console.log("objeto service: ", objeto);
    this.imageDetailList.push({
      especie: objeto.especie,
      anombre: objeto.nombre,
      fotoMascota: objeto.fotoMascota
    });
  }

}
