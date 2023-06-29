import { Pipe, PipeTransform } from '@angular/core';
import { format, formatDistance, formatRelative, subDays } from 'date-fns';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(date: Date): unknown {
    const currentDate = new Date()
    const yourDate: Date = new Date(new Date(date) + ' UTC');

    // 864000000 is one day in miliseconds
    if(currentDate.getTime() - yourDate.getTime() > 86400000){
      return formatRelative(yourDate, new Date())
    }
    return format(yourDate, 'HH:mm')
    
  }

}
