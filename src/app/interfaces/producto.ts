export interface Producto {
    id?:string;
    nombre:string;
    precio:number;
    precioConDescuento?: number;
    descripcion:string;
    stock:number;
    categoria:string;
    image:string;
}
