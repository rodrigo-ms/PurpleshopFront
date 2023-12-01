import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  constructor(private firestore:Firestore) { }

  saveUser(id: string, correo: string, tipoUsuario: string): Promise<void> {
    const usuarioRef = doc(this.firestore, 'usuarios', id);
    const usuarioData = { correo, tipoUsuario, idCompra: '' }; // Puedes ajustar los datos según tu interfaz

    return setDoc(usuarioRef, usuarioData);
  }

  async getUserById(id: string): Promise<Usuario | undefined> {
    const usuarioRef = doc(this.firestore, 'usuarios', id);

    return getDoc(usuarioRef).then((snapshot) => {
      if (snapshot.exists()) {
        // Si el documento existe, devuelve los datos del usuario
        return snapshot.data() as Usuario;
      } else {
        // Si el documento no existe, devuelve undefined
        return undefined;
      }
    });
  }
}
