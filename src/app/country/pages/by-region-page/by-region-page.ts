import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { REGIONS } from '../../interfaces/country.interfaces';

@Component({
  selector: 'by-region-page',
  imports: [CountryList],
  templateUrl: './by-region-page.html',
})
export class ByRegionPage {
  countryService = inject(CountryService);
  query = signal('');
  readonly regions = REGIONS; 

  regionResource = rxResource({
    params: () => ({ query: this.query() }),
    
    stream: ({ params}) => {
      if (!params.query) return of([]);
      return this.countryService.searchByRegion(params.query);
    }
  })
}
