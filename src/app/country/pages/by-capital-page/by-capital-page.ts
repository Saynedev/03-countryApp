import { ChangeDetectionStrategy, Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { CountrySearchInput } from "../../components/country-search-input/country-search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { RESTCountry } from '../../interfaces/rest-countries.interfaces';
import { Country } from '../../interfaces/country.interfaces';
import { count, firstValueFrom, map, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchInput, CountryList],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {

  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  query = toSignal(
    this.activatedRoute.queryParamMap.pipe(
      map(params => params.get('query') ?? '')
    ),
    { initialValue: '' }
  );

  CountryResource = rxResource({
    params: () => ({ query: this.query() }),

    stream: ({ params }) => {
      if (!params.query) return of([]);

      return this.countryService.searchByCapital(params.query);
    }
  });

  search(query: string) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { query }
    });
  }
}





  /* countryService = inject(CountryService);
  query = signal('');

  CountryResource = resource({
    params: () => ({ query: this.query() }),
    loader: async({ params }) => {
      if( !params.query ) return [];
      
      //nos permite transformar cualquier observable en una promesa
      return await firstValueFrom(
        this.countryService.searchByCapital(params.query)
      );
    }
  }) */

  /* isLoading = signal(false)
  isError = signal<string|null>(null)
  countries = signal<Country[]>([])

  onSearch(value: string) {
  if (this.isLoading()) return;

  this.isLoading.set(true);
  this.isError.set(null);

  this.countryService.searchByCapital(value).subscribe({
  next: (countries) => {
    this.countries.set(countries);
    this.isLoading.set(false);
  },

  error: (err) => {
    this.isLoading.set(false);
    this.countries.set([]);
    this.isError.set(err);
    
  }
});
    
  } */

