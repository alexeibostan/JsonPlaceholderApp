import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upperFirstLetter'
})
export class UpperFirstLetterPipe implements PipeTransform {

  transform(value: string): string {
    if(!value) return '';
    return value.slice(0,1).toUpperCase().concat(value.slice(1));
  }

}
