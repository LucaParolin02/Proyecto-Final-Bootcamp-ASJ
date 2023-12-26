import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cuitPipe'
})
export class CuitPipePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }
    const formattedValue = value.replace(/(\d{2})(\d{8})(\d{1})/, '$1-$2-$3');
    return formattedValue;
  }

}
