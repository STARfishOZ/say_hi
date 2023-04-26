import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { debounceTime, distinctUntilChanged, filter, Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Country } from './types/country.type';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MovieInterface } from './types/movie.interface';
import { EnterService } from './services/enter.service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { FormDataInterface } from '../../types/form-data.interface';

@Component({
  standalone: true,
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['enter.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    NgIf,
    MatSelectModule,
    MatAutocompleteModule,
    AsyncPipe,
    NgForOf,
    MatButtonModule
  ],
})
export class EnterComponent implements OnInit, OnDestroy {

  form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")]],
    userName: ['', Validators.email],
    country: [<Country>'',[ Validators.required]],
    postCode: ['', [Validators.minLength(6), Validators.maxLength(10)]],
    favouriteMovie: ['', Validators.minLength(3)],
  }, {updateOn: 'submit'});
  movies$: Observable<MovieInterface[]> | undefined;

  private readonly moveTypingDelay = 700;
  private destroy$ = new Subject<void>();

  constructor(private formBuilder: FormBuilder,
              private enterService: EnterService,
              private router: Router,
              private sharedService: SharedService,) {
  }

  ngOnInit(): void {
    this.createFormSubscription();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onMovieChange(event: Event): void {
    this.form.controls.favouriteMovie.setValue((event.target as HTMLTextAreaElement).value);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.sharedService.formData.next(this.form.value as FormDataInterface);
      this.router.navigate(['thankyou'])
    }
  }

  private setPostCodeValidator(country: Country): void {
    const postCodeUKPattern = Validators.pattern(`^[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]? [0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}$`);

    if (country === 'United Kingdom') {
      this.form.controls.postCode.setValidators([postCodeUKPattern, Validators.required]);
    } else {
      this.form.controls.postCode.setValidators([Validators.minLength(6), Validators.maxLength(10)]);
    }
  }

  private createFormSubscription(): void {
    this.form.controls.country.valueChanges
      .pipe(
        distinctUntilChanged(),
        filter(() => this.form.controls.country.valid),
        tap((country: Country) => this.setPostCodeValidator(country)),
        takeUntil(this.destroy$)
      )
      .subscribe()

    this.movies$ = this.form.controls.favouriteMovie.valueChanges
      .pipe(
        debounceTime(this.moveTypingDelay),
        distinctUntilChanged(),
        filter(() => this.form.controls.favouriteMovie.valid),
        switchMap((value) => this.enterService.getMovies(value as string)),
      )
  }
}
