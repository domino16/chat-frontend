import { Pipe, PipeTransform } from '@angular/core';
import { formatDistance, subDays } from 'date-fns';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(date: Date): string {
    return formatDistance(subDays(date, 3), date, { addSuffix: true })
  }

}
