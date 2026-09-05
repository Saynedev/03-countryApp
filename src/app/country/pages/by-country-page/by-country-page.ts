import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import { CountrySearchInput } from "../../components/country-search-input/country-search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'by-country-page',
  imports: [CountrySearchInput, CountryList],
  templateUrl: './by-country-page.html',
})
export class ByCountryPage {

  countryService = inject(CountryService);
  query = signal('');

  CountryResource = rxResource({
  params: () => ({ query: this.query() }), // cada vez que this.query cambie, rxResource lo detecta y vuelve a disparar la funcion stream
//Nota:Si params devuelve undefined, rxResource se pone en pausa y no realiza ninguna petición

  stream: ({ params }) => { //es la funcion que se ejecuta cada vez que params cambia, y es la que realiza la peticion al servicio
    if (!params.query) return of([]); // si el objeto viene vacio, devuelve un observable de un array vacio

    return this.countryService.searchByCountry(params.query);
  }
});

}
