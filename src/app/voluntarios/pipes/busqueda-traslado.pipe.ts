import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'busquedaTraslado'
})
export class BusquedaTrasladoPipe implements PipeTransform {

  transform(value: any, campo: string, ...args: any[]): any {
    if(!value){
      return null;
    }
    if(!args){
      return value;
    }
 // return value.filter(singleItem => singleItem[campo].toLowerCase().includes(args))
 
  }

}
