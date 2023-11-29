import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  nuevoProducto: any = {}; // Objeto para almacenar los datos del nuevo producto
  listaProductos: any[] = []; // Lista de productos

  constructor() {
    // Obtener lista de productos (simulado)
  }

  agregarProducto() {
    // Agregar nuevo producto a la lista (simulado)

    // Limpiar el formulario y el objeto nuevoProducto
    this.nuevoProducto = {};
  }

  editarProducto(producto: any) {
    // Lógica para editar producto (simulado)
    console.log('Editar producto:', producto);
  }

  eliminarProducto(producto: any) {
    // Lógica para eliminar producto (simulado)

    // Actualizar la lista de productos
  }
}
