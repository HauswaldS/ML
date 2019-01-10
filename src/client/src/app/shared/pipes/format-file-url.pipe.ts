import {Inject, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'formatFileUrl'
})
export class FormatFileUrlPipe implements PipeTransform {

  constructor(@Inject('BASE_URL') private baseUrl: string) {
  }

  transform(fileName: string, type: string, isStatic: boolean = false): string {
    if (!fileName) {
      return '';
    } else {
      const dirPath = isStatic ? 'public/static' : 'public/uploads';
      if (fileName.includes('base64')) {
        return fileName;
      } else {
        return `${this.baseUrl}/${dirPath}/${type}s/${fileName}`;
      }
    }
  }

}
