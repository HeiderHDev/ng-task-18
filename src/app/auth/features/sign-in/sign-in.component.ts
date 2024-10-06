import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { hasEmailError, isRequired } from '../../utils/validator';
import { AuthService } from '../../data-acces/auth.service';
import { toast } from 'ngx-sonner';
import { Router, RouterLink } from '@angular/router';
import { FormSignIn } from '../../interface/form-sign-in.interface';
import { GoogleButtonComponent } from '../../ui/google-button/google-button.component';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, GoogleButtonComponent],
  providers: [AuthService],
  templateUrl: './sign-in.component.html',
  styles: ``,
})
export default class SignInComponent {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.form);
  }

  hasEmailError() {
    return hasEmailError(this.form);
  }

  form = this._formBuilder.group<FormSignIn>({
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this._formBuilder.control('', [Validators.required]),
  });

  hasRequiredError(field: string) {
    const control = this.form.get(field);
    return control?.hasError('required') && control.touched;
  }

  async onSubmit() {
    if (this.form.invalid) return;
    try {
      const { email, password } = this.form.value;
      if (!email || !password) return;
      await this._authService.signIn({ email, password });
      toast.success('Hola nuevamente');
      this._router.navigateByUrl('/tasks');
    } catch (error) {
      console.error(error);
      toast.success('Error al crear la cuenta');
    }
  }

  async submitWithGoogle() {
    try {
      await this._authService.signInWithGoogle();
      toast.success('Bienvenido a tu cuenta');
      this._router.navigateByUrl('/tasks');
    } catch (error) {
      toast.success('Error al iniciar sesión');
    }
  }
}
