import { Component, computed, inject } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherResponse } from '../../interfaces';
import { AlertComponent } from "../alert/alert.component";
import { FormatTemperaturePipe } from '../../pipes/format-temperature.pipe';

@Component({
  selector: 'app-weather-detail',
  standalone: true,
  imports: [
    AlertComponent, 
    FormatTemperaturePipe
  ],
  templateUrl: './weather-detail.component.html',
  styleUrl: './weather-detail.component.css'
})
export class WeatherDetailComponent {

  private weatherService = inject(WeatherService)

  public hasData = computed<boolean>(() => {
    return this.weatherService.weatherOrError() !== null
  })

  public isError = computed(() => {
    return typeof this.weatherService.weatherOrError() === "string"
  })
  
  public get weather(): WeatherResponse {
    return this.weatherService.weatherOrError() as WeatherResponse
  }

  
  public get error() : string {
    return this.weatherService.weatherOrError() as string
  }
  
  
}
