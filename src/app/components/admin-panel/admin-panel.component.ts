import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/interfaces/producto';
import { Venta } from 'src/app/interfaces/venta';
import { ProductoService } from 'src/app/services/producto.service';
import { VentaService } from 'src/app/services/venta.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  listaProductos: Producto[] = []; // Lista de productos
  listaVentasEnEspera: Venta[] = [];
  listaVentas: Venta[] = [];
  formulario:FormGroup;

  constructor(
    private productoService: ProductoService,
    private ventaService :VentaService
    ) {
    this.formulario = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
      stock: new FormControl('', [Validators.required]),
      imagen: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),

    });
  }

  ngOnInit(): void {
    this.productoService.getproductos()
      .toPromise()
      .then((productos: any) => {
        this.listaProductos = productos;
      })
      .catch((error: any) => {
        console.error('Error al obtener productos:', error);
      });
  
    this.mostrarVentasEnEspera();
    this.mostrarVentas();

  }
  

  agregarProducto(event: Event) {
    event.preventDefault(); // Evitar la recarga de la página por defecto
    const nuevoProducto: Producto = this.formulario.value;
  
    // Guardar el producto
    this.productoService.saveProduct(nuevoProducto)
      .subscribe(
        () => {
          // Éxito al guardar el producto
  
          // Muestra una alerta de éxito utilizando SweetAlert
          Swal.fire({
            title: 'Producto guardado',
            text: 'El producto se ha guardado exitosamente.',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
  
          // Limpiar el formulario después de guardar el producto
          this.formulario.reset();
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        },
        (error) => {
          // Manejar errores al guardar el producto
  
          // Muestra una alerta de error utilizando SweetAlert
          Swal.fire({
            title: 'Error al guardar el producto',
            text: 'Ha ocurrido un error al intentar guardar el producto. Por favor, inténtalo de nuevo.',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      );
  }
  
  


  editarProducto(producto: any) {
    // Lógica para editar producto (simulado)
    console.log('Editar producto:', producto);
  }

  

  async eliminarProducto(id: any) {
    try {
      // Utiliza .toPromise() para convertir el Observable a una Promesa
      const response = await this.productoService.deleteProduct(id).toPromise();
      
      // Muestra una alerta de éxito utilizando SweetAlert
      Swal.fire({
        title: 'Producto eliminado',
        text: response,
        icon: 'success',
        confirmButtonText: 'Ok'
      });  setTimeout(() => {
        window.location.reload();
      }, 3000);
      
      // Otras acciones después de eliminar el producto, si es necesario
    } catch (error) {
      // Maneja el error y muestra una alerta de error utilizando SweetAlert
      console.error('Error al eliminar el producto:', error);
      Swal.fire({
        title: 'Error al eliminar el producto',
        text: 'Ha ocurrido un error al intentar eliminar el producto. Por favor, inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }
  
  




  async mostrarVentasEnEspera(): Promise<void> {
    try {
      this.ventaService.obtenerVentasEnEspera().subscribe(
        (ventasEnEspera: Venta[]) => {
          console.log(ventasEnEspera);
          this.listaVentasEnEspera = ventasEnEspera;
        },
        error => {
          console.error('Error al obtener ventas en espera:', error);
        }
      );
    } catch (error) {
      console.error('Error al obtener ventas en espera:', error);
    }
  }
  

  async mostrarVentas(): Promise<void> {
    try {
      this.ventaService.obtenerVentas().subscribe(
        (ventas: Venta[]) => {
          console.log(ventas);
          this.listaVentas = ventas;
        },
        error => {
          console.error('Error al obtener ventas:', error);
        }
      );
    } catch (error) {
      console.error('Error al obtener ventas:', error);
    }
  }


  async actualizarEstadoVenta(idVenta: any, nuevoEstado: string): Promise<void> {
    try {
      // Utiliza el servicio para actualizar el estado de la venta
      const responseText = await this.ventaService.actualizarEstadoVenta(idVenta, nuevoEstado).toPromise();
  
      // Muestra una alerta de éxito utilizando SweetAlert
      Swal.fire({
        title: 'Estado actualizado',
        text: responseText, // Utiliza la respuesta directamente
        icon: 'success',
        confirmButtonText: 'Ok'
      });
  
      // Actualiza la lista de ventas en espera después de la actualización
      this.mostrarVentasEnEspera();
    } catch (error) {
      // Maneja el error y muestra una alerta de error utilizando SweetAlert
      console.error('Error al actualizar el estado de la venta:', error);
      Swal.fire({
        title: 'Error al actualizar el estado de la venta',
        text: 'Ha ocurrido un error al intentar actualizar el estado de la venta. Por favor, inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }
  

 


}
