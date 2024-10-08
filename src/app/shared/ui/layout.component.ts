import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { toast } from 'ngx-sonner';
import { AuthStateService } from '../data-acces/auth-state.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule],
  template: `
    <header class="h-[80px] mb-8 w-full max-w-screen-lg mx-auto px-4">
      <nav class="flex justify-between items-center h-full">
        <a class="text-2xl font-bold" routerLink="/tasks">Heider Task</a>
        <button
          class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          (click)="logout()"
        >
          Salir
        </button>
      </nav>
    </header>
    <router-outlet></router-outlet>
  `,
  styles: ``,
})
export default class LayoutComponent {
  private readonly _authState = inject(AuthStateService);
  private readonly router = inject(Router);

  async logout() {
    await this._authState.logOut();
    this.router.navigateByUrl('/auth/sign-in');
    toast.success('Sesión cerrada');
  }
}
