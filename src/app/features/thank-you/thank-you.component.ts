import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';

import { SharedService } from '../../services/shared.service';
import { FormData } from '../../types/form.data';

@Component({
  standalone: true,
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: [ 'thank-you.component.less' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf
  ]
})
export class ThankYouComponent {
  formData: FormData | null;
  constructor(private route: ActivatedRoute, private sharedService: SharedService) {
    this.formData = this.sharedService.formData.value;
  }
}
