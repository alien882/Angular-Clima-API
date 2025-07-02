import { Component, inject, signal } from '@angular/core';
import { Country } from '../../interfaces';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertComponent } from "../alert/alert.component";
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, AlertComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  private formBuilder = inject(FormBuilder)
  private weatherService = inject(WeatherService)

  public error = signal(false)

  public reactiveForm = this.formBuilder.group({
    city: ["", Validators.required],
    country: ["", Validators.required]
  })

  public countries: Country[] = [
    { code: 'US', name: 'Estados Unidos' },
    { code: 'MX', name: 'México' },
    { code: 'AR', name: 'Argentina' },
    { code: 'CO', name: 'Colombia' },
    { code: 'CR', name: 'Costa Rica' },
    { code: 'ES', name: 'España' },
    { code: 'PE', name: 'Perú' }
  ]

  onSubmit() {

    if (this.reactiveForm.invalid) {
      this.error.set(true)
      return
    }

    this.error.set(false)

    const { city, country } = this.reactiveForm.controls

    this.weatherService.searchWeather({
      city: city.value!,
      country: country.value!
    })
  }
}
