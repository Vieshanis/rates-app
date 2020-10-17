import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RatesPeriodRoutingModule } from './rates-period-routing.module';
import { RatesPeriodComponent } from './rates-period.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [RatesPeriodComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RatesPeriodRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
  ]
})
export class RatesPeriodModule { }
