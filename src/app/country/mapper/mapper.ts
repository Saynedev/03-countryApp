import { count } from 'rxjs';
import { Country } from '../interfaces/country.interfaces';
import { RESTCountry, Flag, Data } from '../interfaces/rest-countries.interfaces';

export class CountryMapper {

    static ApiCountryToCountry(response: RESTCountry): Country[] {
        return response.data.objects.map(country => ({
            namee: country.names.common,
            flag: country.flag.url_png,
            flag_svg: country.flag.url_svg,
            capital: country.capitals.map(capital => capital.name),
            population: country.population,
            region: country.region
        }));
  } 

 
}