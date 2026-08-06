import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountrySearchInput {

  value = output<string>();
  placeholder = input<string>("Buscar");


}
