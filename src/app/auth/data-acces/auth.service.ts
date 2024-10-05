import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { UserSignUp } from '../interface/user-sign-up.interface';
@Injectable()
export class AuthService {
  private readonly _auth = inject(Auth);

  signUp(user: UserSignUp) {
    return createUserWithEmailAndPassword(
      this._auth,
      user.email,
      user.password
    );
  }
}
