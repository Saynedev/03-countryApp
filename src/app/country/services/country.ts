import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { RESTCountry, Data } from '../interfaces/rest-countries.interfaces';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { CountryMapper } from '../mapper/mapper';
import { Country } from '../interfaces/country.interfaces';

const API_URL = 'https://api.restcountries.com/countries/v5';
const token = 'YOUR TOKEN HERE';
@Injectable({
  providedIn: 'root',
})

export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>(); // {}
  private queryCacheCountry = new Map<string, Country[]>(); // {}
  private queryCacheRegion  = new Map<string, Country[]>();



  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    
    if(this.queryCacheCapital.has(query)){
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    console.log("Llegando al servidor por ${query}");

  return this.http.get<RESTCountry>(
    `${API_URL}/capitals?q=${query}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  ).pipe(
    map((response) => CountryMapper.ApiCountryToCountry(response)),
      tap((countries) => this.queryCacheCapital.set(query, countries)),
      
      catchError(error => {
        console.error('Error fetching countries by capital:', error);
        return throwError(
          () => new Error('No se pudieron obtener los paises')
        );
      })
  );
}

  searchByRegion(region: string): Observable<Country[]>{
    region = region.toLowerCase();

    if(this.queryCacheRegion.has(region)){
      console.log("Llegando al cache por ${region}");
      return of(this.queryCacheRegion.get(region) ?? []);
    }
    console.log("Llegando al servidor por ${region}");
    return this.http.get<RESTCountry>(
      `${API_URL}?region=${region}`,
      {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    ).pipe(
      map((countries) => CountryMapper.ApiCountryToCountry(countries)),
      tap((countries) => this.queryCacheRegion.set(region, countries)),
      catchError(error => {
        console.error('Error fetching countries by name:', error);
        return throwError(
          () => new Error('No se pudieron obtener los paises')
        );
      })
    )
      
    
  }

  searchByCountry(query: string): Observable<Country[]>{
    query = query.toLowerCase();

    if(this.queryCacheCountry.has(query)){
      console.log("Llegando al cache por ${query}");
      return of(this.queryCacheCountry.get(query) ?? []);
    }
    console.log("Llegando al servidor por ${query}");

    return this.http.get<RESTCountry>(
    `${API_URL}/names.common?q=${query}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  ).pipe(
    map(response =>
      CountryMapper.ApiCountryToCountry(response)),
      tap((countries) => this.queryCacheCountry.set(query, countries)),
      delay(1000),
      catchError(error => {
        console.error('Error fetching countries by name:', error);
        return throwError(
          () => new Error('No se pudieron obtener los paises')
        );
      })
  );
}

searchByAlphaCode(code: string): Observable<Country | undefined>{
    return this.http.get<RESTCountry>(
    `${API_URL}/names.common?q=${code}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  ).pipe(
    map(response =>
      CountryMapper.ApiCountryToCountry(response)),
      map((countries) => countries.at(0)),
      catchError(error => {
        console.error('Error fetching countries by name:', error);
        return throwError(
          () => new Error('No se pudieron obtener los paises')
        );
      })
  );
}

}
