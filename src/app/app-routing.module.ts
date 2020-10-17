import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'rates',
    loadChildren: () => import('./rates/rates.module')
      .then(m => m.RatesModule)
  },
  {
    path: 'rates-period',
    loadChildren: () => import('./rates-period/rates-period.module')
      .then(m => m.RatesPeriodModule)
  },
  {
    path: '',
    redirectTo: 'rates',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'rates',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
