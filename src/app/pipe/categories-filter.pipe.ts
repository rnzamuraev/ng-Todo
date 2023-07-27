import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoriesFilter'
})
export class CategoriesFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
