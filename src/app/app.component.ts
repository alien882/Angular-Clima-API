import { Component, inject } from '@angular/core';
import { FormComponent } from "./components/form/form.component";
import { WeatherDetailComponent } from "./components/weather-detail/weather-detail.component";
import { WeatherService } from './services/weather.service';
import { SpinnerComponent } from "./components/spinner/spinner.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormComponent, 
    WeatherDetailComponent, 
    SpinnerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private weatherService = inject(WeatherService)

  
  public get loading() : boolean {
    return this.weatherService.loading()
  }
  
}
