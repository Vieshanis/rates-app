import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RatesPeriodComponent } from './rates-period.component';

const routes: Routes = [{ path: '', component: RatesPeriodComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RatesPeriodRoutingModule { }
