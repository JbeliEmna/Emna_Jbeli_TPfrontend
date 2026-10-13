import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials',
})
export class InitialsPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if(!value || !value.trim()) return '?';
    return value
      .trim()               // enlève les espaces au début/à la fin
      .split(/\s+/)         // découpe en mots (un ou plusieurs espaces)
      .slice(0, 2)          // garde seulement les 2 premiers mots
      .map(word => word[0]) // prend la 1re lettre de chaque mot
      .join('')             // « A » + « B » → « AB »
      .toUpperCase();       // en majuscules

  
  }
}
