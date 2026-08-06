import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { RESTCountry, Data } from '../interfaces/rest-countries.interfaces';
import { map, Observable } from 'rxjs';
import { CountryMapper } from '../mapper/mapper';
import { Country } from '../interfaces/country.interfaces';

const API_URL = 'https://api.restcountries.com/countries/v5';
const token = 'rc_live_a8af2f30da444105984598e28c593327';

@Injectable({
  providedIn: 'root',
})

export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {

  return this.http.get<RESTCountry>(
    `${API_URL}/capitals?q=${query}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  ).pipe(
    map(response =>
      CountryMapper.ApiCountryToCountry(response)
    )
  );
}

}


