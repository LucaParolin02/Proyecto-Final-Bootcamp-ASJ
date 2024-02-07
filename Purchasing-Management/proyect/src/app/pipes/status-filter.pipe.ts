import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusFilter'
})
export class StatusFilterPipe implements PipeTransform {

  transform(array: any[], filter: string): any[] {
    if (!filter || filter === 'All') return array;

    return array.filter((item) => {
      if (item.status?.name) {
        return item.status.name.toLowerCase().includes(filter.toLowerCase());
      }
      return false;
    });
  }

}
