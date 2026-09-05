import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RESTCountry } from '../../interfaces/rest-countries.interfaces';
import { Country } from '../../interfaces/country.interfaces';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './country-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CountryList {
  countries = input<Country[]>();

  errorMessage = input<String | unknown | undefined>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);

}
