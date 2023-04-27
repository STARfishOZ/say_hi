import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { of } from 'rxjs';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { FormFacade } from '@app/features/enter/+state/form.facade';
import { EnterComponent } from '@app/features/enter/enter.component';
import { EnterService } from '@app/features/enter/services/enter.service';
import { ThankYouComponent } from '@app/features/thank-you/thank-you.component';

describe('EnterComponent', () => {
  let component: EnterComponent;
  let fixture: ComponentFixture<EnterComponent>;
  let enterService: EnterService;
  let formFacade: FormFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideAnimations(),
        provideStore(),
        provideEffects(),
        provideRouter([ {path: 'thankyou', component: ThankYouComponent}]),
        EnterService,
        FormFacade,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    enterService = TestBed.inject(EnterService);
    formFacade = TestBed.inject(FormFacade);
    fixture = TestBed.createComponent(EnterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
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
    it('should call navigate when form is valid', (() => {
      spyOn(formFacade, 'setForm');
      component.form.controls.country.setValue('Ireland');
      component.form.controls.name.setValue('Ireland');
      component.onSubmit();

      expect(formFacade.setForm).toHaveBeenCalledWith({ name: 'Ireland', userName: '', country: 'Ireland', postCode: '', favouriteMovie: '' });
    }));
  })
});
