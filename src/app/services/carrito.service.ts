// carrito.service.ts
import { Injectable } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto';
import { Carrito } from '../interfaces/carrito';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private claveLocalStorage = 'carrito';
  carrito: Carrito[] = [];

  constructor() {
    this.cargarCarrito();
  }

  private guardarCarrito(): void {
    localStorage.setItem(this.claveLocalStorage, JSON.stringify(this.carrito));
  }

  private cargarCarrito(): void {
    const carritoGuardado = localStorage.getItem(this.claveLocalStorage);

    if (carritoGuardado) {
      this.carrito = JSON.parse(carritoGuardado);
    }
  }

  agregarAlCarrito(producto: Producto): void {
    const index = this.carrito.findIndex((venta) => venta.producto.id === producto.id);

    if (index !== -1) {
      // Si el producto ya está en el carrito, incrementa la cantidad
      this.carrito[index].cantidad++;
    } else {
      // Si no está en el carrito, agrégalo con cantidad 1
      this.carrito.push({ producto, cantidad: 1 });
    }

    this.guardarCarrito();
  }

  obtenerVentas(): Carrito[] {
    return this.carrito;
  }


  eliminarProducto(index: number): void {
    this.carrito.splice(index, 1);
    this.guardarCarrito();
  }

  vaciarCarrito(): void {
    this.carrito = [];
    this.guardarCarrito();
  }
}
