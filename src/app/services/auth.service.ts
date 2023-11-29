import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, GoogleAuthProvider, User } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isAuthenticated$() {
    return this._isAuthenticated.asObservable();
  }

  constructor(private auth: Auth) {
    this.checkAuthState();
  }

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    return signOut(this.auth);
  }

  checkAuthState() {
    this.auth.onAuthStateChanged((user: User | null) => {
      this._isAuthenticated.next(!!user);
    });
  }
}
