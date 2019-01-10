import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'formatFileSize'
})
export class FormatFileSizePipe implements PipeTransform {

  transform(fileSize: string | number): string {
    if (!fileSize) {
      return "0 Mb"
    } else {
      fileSize = (typeof(fileSize) === 'string' ? parseInt(fileSize) : fileSize);
      return `${(fileSize / 1024 / 1024).toFixed(2)} Mb`;
    }
  }

}
