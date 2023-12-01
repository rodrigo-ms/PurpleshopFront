import { Injectable } from '@angular/core';
import { Firestore,collection,addDoc, doc,getDocs, QuerySnapshot, DocumentData,deleteDoc } from '@angular/fire/firestore';
import { Producto } from '../interfaces/producto'; 
import { Observable, from, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private firestore:Firestore) { }


  saveProduct(producto:Producto){
      const productoRef = collection(this.firestore,'productos');
      return addDoc(productoRef,producto);
  }


  async getProducts(): Promise<Producto[]> {
    const productoRef = collection(this.firestore, 'productos');

    try {
      const querySnapshot = await getDocs(productoRef);

      // Obtener los documentos del QuerySnapshot y convertirlos en un array de Productos
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() as Producto
      }));
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw error; // Puedes manejar el error según tus necesidades
    }
  }

  

  deleteProduct(producto: Producto) {
    const productoRef = doc(this.firestore, `productos/${producto.id}`);
    return deleteDoc(productoRef);
  }

}
  


