import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesFilterPipe } from './categories-filter.pipe';



@NgModule({
  declarations: [
    CategoriesFilterPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipeModule { }
