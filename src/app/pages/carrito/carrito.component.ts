// carrito.component.ts
import { Component } from '@angular/core';
import { Carrito } from 'src/app/interfaces/carrito'; 
import { Venta } from 'src/app/interfaces/venta';
import { VentaService } from 'src/app/services/venta.service';
import { CarritoService } from 'src/app/services/carrito.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  comprobante: string = ".";
  correo: string = '';
  telefono: string = '';
  nombreCompleto: string = '';
  
  constructor(private carritoService: CarritoService,private ventaService: VentaService) {
  }


  obtenerVentas(): Carrito[] {
    return this.carritoService.obtenerVentas();
  }

  calcularTotal(): number {
    return this.carritoService.obtenerVentas().reduce((total, venta) => {
      return total + venta.producto.precio * venta.cantidad;
    }, 0);
  }

  eliminarProducto(index: number): void {
    this.carritoService.eliminarProducto(index);
  }

  vaciarCarrito(): void {
    this.carritoService.vaciarCarrito();
  }

  pagar(): void {
    // Verificar que se hayan ingresado el correo, teléfono y nombre
    if (this.correo && this.telefono && this.nombreCompleto) {
      const totalVenta: number = this.calcularTotal();
      const img = this.comprobante;
  
      if (totalVenta !== 0 && this.carritoService.obtenerVentas().length > 0 && this.comprobante !== ".") {
        const venta: Venta = {
          carrito: this.carritoService.obtenerVentas(),
          total: totalVenta.toString(),
          estado: 'espera',
          imagen: img,
          telefono: this.telefono,
          nombre_completo: this.nombreCompleto,
          correo: this.correo,
        };
  
        // Guardar la venta en la base de datos
        this.ventaService.guardarVenta(venta).subscribe(
          () => {
            // Mostrar SweetAlert2 en caso de éxito
            Swal.fire({
              title: 'Compra registrada',
              text: 'Para que esta Compra sea válida debes enviarnos el comprobante de transferencia por cualquiera de los medios disponibles. Recibirás un correo con toda la información de la compra.',
              icon: 'success',
              confirmButtonText: 'OK',
            });
  
            // Limpiar el carrito después de una venta exitosa
            this.carritoService.vaciarCarrito();
          },
          (error) => {
            console.error('Error al guardar la venta:', error);
            // Mostrar SweetAlert2 en caso de error
            Swal.fire({
              title: 'Error',
              text: 'Ha ocurrido un error al procesar la venta.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
        );
      } else {
        // Mostrar SweetAlert2 si no se puede realizar la venta
        Swal.fire({
          title: 'No se puede realizar la venta',
          text: 'el carrito está vacío.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } else {
      // Mostrar SweetAlert2 si falta información
      Swal.fire({
        title: 'Falta información',
        text: 'Debe ingresar el correo, teléfono y nombre antes de realizar la compra.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    }
    if(this.comprobante == ".") {
      // Mostrar SweetAlert2 si falta información
      Swal.fire({
        title: 'Falta información',
        text: 'Debe indicar cómo enviará el comprobante de pago.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    }
  }
  
  

  registrarComprobante(comprobante:string): void {
    this.comprobante=comprobante
  }
  

  accordionItems = [
    { id: 1, title: 'Datos de transferencia ⬇️', content: '', },
 

  ];

  activeItem: number | null = null;

  toggleAccordion(id: number): void {
    this.activeItem = (this.activeItem === id) ? null : id;
  }

  
}
