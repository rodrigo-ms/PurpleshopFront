import { Carrito} from './carrito';
export interface Venta {
    id?:string;
    carrito: Carrito[];
    total:string;
    estado: string;
    imagen:string;
    telefono:string;
    nombre_completo:string;
    correo:string;
    
}
