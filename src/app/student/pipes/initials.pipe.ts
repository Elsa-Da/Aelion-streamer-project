import { Pipe, PipeTransform } from '@angular/core';
import { ISimpleStudent } from '../interfaces/i-simpleStudent';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(value: ISimpleStudent, ...args: unknown[]): string {
    return value.firstName!.charAt(0) + value.lastName.charAt(0);
  }

}
