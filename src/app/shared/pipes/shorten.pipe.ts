import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(text: string, index?: number) {
    if (!text) return '';
    if (index && text.length > index) text = text.slice(0, index) + '...';
    return text;
  }

}
