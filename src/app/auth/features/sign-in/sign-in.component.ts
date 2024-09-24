import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styles: ``,
})
export default class SignInComponent {
  private _formBuilder = inject(FormBuilder);

  form = this._formBuilder.group<any>({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
}
