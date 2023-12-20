import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from'@angular/common/http';
import { Global } from "./global";
import { Observable, catchError, map,} from 'rxjs';

import { Venta } from '../interfaces/venta';


@Injectable({
  providedIn: 'root'
})
export class VentaService {
  public url: string;


  constructor(private _http:HttpClient, ) {  this.url=Global.url; }

  
  

  guardarVenta(venta: any): Observable<any> {
    console.log(venta)
    let params = JSON.stringify(venta);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'ventaSave', params, { headers: headers }).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error al realizar la solicitud:', error);
        throw error;
      })
    );
  }
  obtenerVentas():Observable<any>{
    return this._http.get<Venta[]>(this.url + 'ventas');
    
  }

  obtenerVentasEnEspera():Observable<any>{
    return this._http.get<Venta[]>(this.url + 'ventasEspera');
    
  }


  deleteVenta(id: any): Observable<any> {
    console.log('vamos a cancelar la venta', id);
   // let headers = new HttpHeaders().set('Content-Type', 'application/json');
  
    // Agrega responseType: 'text' para indicar que esperas una respuesta de texto
    return this._http.delete(this.url + 'venta/' + id, {  responseType: 'text' });
  }

  actualizarEstadoVenta(id: any, nuevoEstado: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let body = { estado: nuevoEstado };
    return this._http.put(this.url + 'updateEstadoVenta/' + id, body, { headers: headers, responseType: 'text' });
  }
  
 
}



//async obtenerVentas(): Promise<Venta[]> {
//  const ventasCollection = collection(this.firestore, 'ventas');
 // const ventasQuery = query(ventasCollection);
//const snapshot = await getDocs(ventasQuery);
//const ventas: Venta[] = [];
 // snapshot.forEach((doc) => {
  //  ventas.push(doc.data() as Venta);
  //});

  //return ventas;
//}