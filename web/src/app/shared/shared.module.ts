import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { QuicklinkModule } from 'ngx-quicklink';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    QuicklinkModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    QuicklinkModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
