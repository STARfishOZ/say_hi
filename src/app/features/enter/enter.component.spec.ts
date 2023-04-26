import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';

import { of } from 'rxjs';

import { EnterService } from './services/enter.service';
import { SharedService } from '../../services/shared.service';
import { ThankYouComponent } from '../thank-you/thank-you.component';
import { EnterComponent } from './enter.component';

describe('EnterComponent', () => {
  let component: EnterComponent;
  let fixture: ComponentFixture<EnterComponent>;
  let enterService: EnterService;
  let sharedService: SharedService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimations(),
        provideRouter([ {path: 'thankyou', component: ThankYouComponent}]),
        EnterService,
        SharedService,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    enterService = TestBed.inject(EnterService);
    sharedService = TestBed.inject(SharedService);
    fixture = TestBed.createComponent(EnterComponent);
    router = TestBed.get(Router)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call getMovies when favouriteMovie value changed', fakeAsync(() => {
      spyOn(enterService, 'getMovies').and.returnValue(of([{title: 'hello'}]));
      component.ngOnInit();

      component.form.controls.favouriteMovie.setValue('set');

      tick(700);
      flush();
      expect(enterService.getMovies).toHaveBeenCalled();
    }));
  })

  describe('onMovieChange', () => {
    it('should call getMovies when called', fakeAsync(() => {
      spyOn(enterService, 'getMovies').and.returnValue(of([{title: 'hello'}]));

      component.onMovieChange({target: { value: 'hello'} as Partial<HTMLTextAreaElement>} as Event);

      tick(700);
      flush();
      expect(enterService.getMovies).toHaveBeenCalled();
    }));
  })

  describe('onSubmit', () => {
    it('should call getMovies when favouriteMovie value changed', (() => {
      spyOn(router, 'navigate');
      component.form.controls.country.setValue('Ireland');
      component.form.controls.name.setValue('Ireland');
      component.onSubmit();

      expect(router.navigate).toHaveBeenCalledWith(['thankyou']);
    }));
  })
});
