import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html'
})
export class ThankYouComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
}
