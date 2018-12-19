import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'arrayOfObjectsToString'
})
export class ArrayOfObjectsToStringPipe implements PipeTransform {

  transform(objectArr: {}[], propName: string, separator: string): any {
    if (!objectArr || !objectArr.length || !propName) {
      return '';
    } else {
      return objectArr.map(o => o[propName]).reduce((a, b) => `${a}${separator ? separator : ' , '}${b}`);
    }
  }

}
