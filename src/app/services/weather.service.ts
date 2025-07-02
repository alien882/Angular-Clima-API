import { inject, Injectable, signal } from '@angular/core';
import { CountryResponse, Search, WeatherResponse } from '../interfaces';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private appId = environment.API_KEY
  private httpClient = inject(HttpClient)

  public weatherOrError = signal<WeatherResponse | string | null>(null)
  public loading = signal(false)

  private getWeather(lat: number, lon: number): Observable<WeatherResponse> {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.appId}`
    return this.httpClient.get<WeatherResponse>(weatherUrl)
  }

  searchWeather(search: Search) {

    this.loading.set(true)

    const { city, country } = search
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&appid=${this.appId}`

    this.httpClient.get<CountryResponse[]>(geoUrl)
      .pipe(
        switchMap(data => this.getWeather(data[0].lat, data[0].lon)),
        catchError(() => of("Ciudad no encontrada"))
      ).subscribe(data => {
        this.loading.set(false)
        this.weatherOrError.set(data)
      })
  }
}
