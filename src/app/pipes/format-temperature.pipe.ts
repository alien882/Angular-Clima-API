import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTemperature',
  standalone: true
})
export class FormatTemperaturePipe implements PipeTransform {

  transform(temperature: number): string {
    const kelvin = 273.15
    return (temperature - kelvin).toFixed(0)
  }

}
