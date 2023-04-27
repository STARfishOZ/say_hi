import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';

import { Observable } from 'rxjs';

import { FormData } from '@app/types/form.data'
import { FormFacade } from '@app/features/enter/+state/form.facade';

@Component({
  standalone: true,
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: [ 'thank-you.component.less' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    AsyncPipe,
  ]
})
export class ThankYouComponent {
  constructor(private formFacade: FormFacade) {
  }

  getFormData(): Observable<FormData | null> {
    return this.formFacade.formData$;
  }
}
