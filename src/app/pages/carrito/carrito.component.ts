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
    const totalVenta: number = this.calcularTotal();
  
    if (totalVenta !== 0 && this.carritoService.obtenerVentas().length > 0) {
      const venta: Venta = {
        carrito: this.carritoService.obtenerVentas(),
        total: totalVenta.toString(),
        estado: 'espera',
        imagen: '.'
      };
  
      // Guardar la venta en la base de datos
      this.ventaService.guardarVenta(venta)

      
        .then(() => {
         

          // Mostrar SweetAlert2 en caso de éxito
          Swal.fire({
            title: 'Venta Exitosa',
            text: 'La venta se ha guardado exitosamente.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
  
          // Limpiar el carrito después de una venta exitosa
          this.carritoService.vaciarCarrito();
        })
        .catch(error => {
          console.error('Error al guardar la venta:', error);
          // Mostrar SweetAlert2 en caso de error
          Swal.fire({
            title: 'Error',
            text: 'Ha ocurrido un error al procesar la venta.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    } else {
      // Mostrar SweetAlert2 si no se puede realizar la venta
      Swal.fire({
        title: 'Error',
        text: 'No se puede realizar la venta. El carrito está vacío o el total es cero.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }
  
}
