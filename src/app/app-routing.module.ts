import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';

const appRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./modules/auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./modules/products/products.module').then(
            (m) => m.ProductsModule,
          ),
      },
      { path: '', redirectTo: '/auth', pathMatch: 'full' },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
