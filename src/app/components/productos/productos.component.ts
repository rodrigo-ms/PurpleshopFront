import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { CarritoService } from 'src/app/services/carrito.service';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  listaProductos: Producto[] = []; // Lista de productos
  currentFilter: string = 'all'; // Filtro actual

  constructor(private productoService: ProductoService,private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.productoService.getProducts()
      .then((productos: any) => {
        console.log(productos);
        this.listaProductos = productos;
      })
      .catch(error => {
        console.error('Error al obtener productos:', error);
      });
  }
  // Método para aplicar filtros
  filterProducts(categoria: string): void {
    this.currentFilter = categoria;
  }

  addCar(producto: Producto): void {
    this.carritoService.agregarAlCarrito(producto);
  }
}
