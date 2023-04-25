import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { FormDataInterface } from '../../types/form-data.interface';
import { NgIf } from '@angular/common';

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
export class ThankYouComponent implements OnInit {
  formData: FormDataInterface | undefined;
  constructor(private route: ActivatedRoute, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.formData = this.sharedService.formData.value;
  }
}
