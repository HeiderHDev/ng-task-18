import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@angular/fire/auth';
import { User } from '../interface/user.interface';
@Injectable()
export class AuthService {
  private readonly _auth = inject(Auth);

  signUp(user: User) {
    return createUserWithEmailAndPassword(
      this._auth,
      user.email,
      user.password
    );
  }

  signIn(user: User) {
    return signInWithEmailAndPassword(this._auth, user.email, user.password);
  }

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    //Tip: para que la cuenta de google sea seleccionada, si tienes sola una cuenta, debes agregar el parametro prompt: 'select_account'
    // para poder crear uns cuenta nueva o iniciar sesión con una cuenta existente
    // provider.setCustomParameters({ prompt: 'select_account' });
    return signInWithPopup(this._auth, provider);
  }
}
