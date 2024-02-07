import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(array: any[], filter: string): any[] {
    if (!filter || filter === 'All') return array;

    return array.filter((item) => {
      if (item.category?.name) {
        return item.category.name.toLowerCase().includes(filter.toLowerCase());
      }
      return false;
    });
  }

}
