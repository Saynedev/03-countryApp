import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CountrySearchInput } from "../../components/country-search-input/country-search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country';
import { RESTCountry } from '../../interfaces/rest-countries.interfaces';
import { Country } from '../../interfaces/country.interfaces';
import { count } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchInput, CountryList],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {

  countryService = inject(CountryService);

  isLoading = signal(false)
  isError = signal<string|null>(null)

  countries = signal<Country[]>([])

  onSearch(value: string) {
  if (this.isLoading()) return;

  this.isLoading.set(true);
  this.isError.set(null);

  this.countryService.searchByCapital(value).subscribe({
  next: (newCountries) => {
    console.log('ENTRÓ EN NEXT');
    console.log(newCountries);

    this.countries.update(currentCountries => [
      ...currentCountries,
      ...newCountries
    ]);

    this.isLoading.set(false);
  },

  error: (error) => {
    console.log('ENTRÓ EN ERROR');
    console.error(error);

    this.isLoading.set(false);
    this.isError.set('Ocurrió un error al buscar los países');
  },

  complete: () => {
    console.log('ENTRÓ EN COMPLETE');
  }
});
    
  }
}
