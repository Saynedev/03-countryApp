import { ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'not-found',
  imports: [],
  templateUrl: './not-found.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {
  location = inject(Location);

  goBack(){
    this.location.back();
  }
}
