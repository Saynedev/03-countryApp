import { CountryService } from './../../services/country';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found";
import { CountryInformation } from "./country-information/country-information";

@Component({
  selector: 'app-country-page',
  imports: [NotFoundComponent, CountryInformation],
  templateUrl: './country-page.html',
})
export class CountryPage {
  
  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  countryService = inject(CountryService);

  countryResource = rxResource({
    params: () => ({ code: this.countryCode }),
    
      stream: ({ params }) => {
        return this.countryService.searchByAlphaCode(params.code);
      }
  })
}
