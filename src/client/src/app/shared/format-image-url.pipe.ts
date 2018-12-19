import {Inject, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'formatImageUrl'
})
export class FormatImageUrlPipe implements PipeTransform {

  constructor(@Inject('BASE_URL') private baseUrl: string) {
  }


  transform(imageName: string): any {
    if (!imageName) {
      return '';
    } else {
      if (imageName.includes('base64')) {
        return imageName;
      } else {
        return `${this.baseUrl}/public/uploads/${imageName}`;
      }
    }
  }

}
