import { Carrito} from './carrito';
export interface Venta {
    carrito: Carrito[];
    total:string;
    estado: string;
    imagen:string;
    
}
