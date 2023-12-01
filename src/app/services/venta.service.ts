import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, collection, query, getDocs, where } from '@angular/fire/firestore';
import { Venta } from '../interfaces/venta';


@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(private firestore: Firestore) { }

  async guardarVenta(venta: Venta): Promise<void> {
    const ventasCollection = collection(this.firestore, 'ventas');

    // Puedes generar un ID automático para la venta o utilizar uno específico si lo tienes
    const ventaRef = doc(ventasCollection);

    return setDoc(ventaRef, venta);
  }

  async obtenerVentas(): Promise<Venta[]> {
    const ventasCollection = collection(this.firestore, 'ventas');
    const ventasQuery = query(ventasCollection);

    const snapshot = await getDocs(ventasQuery);

    const ventas: Venta[] = [];

    snapshot.forEach((doc) => {
      ventas.push(doc.data() as Venta);
    });

    return ventas;
  }

  async obtenerVentasEnEspera(): Promise<Venta[]> {
    const ventasCollection = collection(this.firestore, 'ventas');
    const ventasQuery = query(ventasCollection, where('estado', '==', 'espera'));
  
    const snapshot = await getDocs(ventasQuery);
  
    const ventas: Venta[] = [];
  
    snapshot.forEach((doc) => {
      ventas.push(doc.data() as Venta);
    });
  
    return ventas;
  }
}