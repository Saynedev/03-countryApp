import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Country } from '../../../interfaces/country.interfaces';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-information',
  imports: [DecimalPipe],
  templateUrl: './country-information.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryInformation {

  informationCountry = input.required<Country>();

  currentYear = computed(() => {
    return new Date().getFullYear()
  });
    
}
