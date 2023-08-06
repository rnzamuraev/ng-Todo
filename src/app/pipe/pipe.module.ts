import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesFilterPipe } from './categories-filter.pipe';
import { TasksFilterPipe } from './tasks-filter.pipe';



@NgModule({
  declarations: [
    CategoriesFilterPipe,
    TasksFilterPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipeModule { }
