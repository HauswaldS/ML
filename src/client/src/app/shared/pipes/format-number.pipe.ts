import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'formatNumber'
})
export class FormatNumberPipe implements PipeTransform {

  transform(number: number): string {
    if (!number) {
      return "0";
    } else {
      let leadingNumbersCount = number.toString().length % 3,
        numberSegments = [''];
      for (let n of number.toString().split('')) {
        if (numberSegments.length === 1 && leadingNumbersCount && numberSegments[0].length < leadingNumbersCount) {
          numberSegments[0] += n;
        } else if ((!leadingNumbersCount || numberSegments.length > 1) && numberSegments[numberSegments.length - 1].length < 3) {
          numberSegments[numberSegments.length - 1] += n;
        } else {
          numberSegments[numberSegments.length] = n;
        }
      }
      return numberSegments.join(' ');
    }
  }

}
