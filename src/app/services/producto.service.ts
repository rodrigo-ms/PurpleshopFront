import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from'@angular/common/http';
import { Global } from "./global";
import { Observable, catchError, map,} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  public url: string;

  constructor(private _http:HttpClient) {  this.url=Global.url; }
  
  saveProduct(producto: any): Observable<any> {
    let params = JSON.stringify(producto);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'productoSave', params, { headers: headers }).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error al realizar la solicitud:', error);
        throw error;
      })
    );
  }
  getproductos():Observable<any>{
    return this._http.get(this.url+'productos');
    
}
  
deleteProduct(id: any): Observable<any> {
  console.log('vamos a borrar el producto', id);
 // let headers = new HttpHeaders().set('Content-Type', 'application/json');

  // Agrega responseType: 'text' para indicar que esperas una respuesta de texto
  return this._http.delete(this.url + 'producto/' + id, {  responseType: 'text' });
}


}
  


