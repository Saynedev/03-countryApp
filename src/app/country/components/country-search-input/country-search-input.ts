import { ChangeDetectionStrategy, Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountrySearchInput {

  value = output<string>();
  placeholder = input<string>("Buscar");
  debouceTime = input<number>(1000);
  
  initialValue = input<string>('');
  inputValue = linkedSignal<string>(() => this.initialValue() ?? ''); // valor del input que se actualiza constantemente

  //efecto que se ejecuta cada vez que cambia el valor del input
  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue(); // obtenemos el valor del input, el cual cambiara cuando inputValue cambie

    const timeout = setTimeout(() => {
      this.value.emit(value); // emitimos el valor del input despues de 1000ms
    }, this.debouceTime());

    onCleanup(() => {
      clearTimeout(timeout); // antes de ejecutar el efecto nuevamente, limpiamos el timeout para evitar que se emitan valores anteriores
    });
  });

}
