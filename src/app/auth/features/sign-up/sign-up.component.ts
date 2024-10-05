import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../data-acces/auth.service';
import { Router, RouterLink } from '@angular/router';
import { hasEmailError, isRequired } from '../../utils/validator';
import { FormSignUp } from '../../interface/form-sign-up.interface';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  providers: [AuthService],
  templateUrl: './sign-up.component.html',
  styles: ``,
})
export default class SignUpComponent {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.form);
  }

  hasEmailError() {
    return hasEmailError(this.form);
  }

  form = this._formBuilder.group<FormSignUp>({
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
      await this._authService.signUp({ email, password });
      toast.success('Cuenta creada exitosamente');
      this._router.navigateByUrl('/tasks');
    } catch (error) {
      console.error(error);
      toast.success('Error al crear la cuenta');
    }
  }
}
