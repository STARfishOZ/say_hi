import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnterComponent } from './enter.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { EnterService } from './services/enter.service';
import { SharedService } from '../../services/shared.service';
import { of } from 'rxjs';

describe('EnterComponent', () => {
  let component: EnterComponent;
  let fixture: ComponentFixture<EnterComponent>;
  let enterService: EnterService;
  let sharedService: SharedService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimations(),
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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('should ', (() => {
      const getMovies = spyOn(enterService, 'getMovies').and.callFake(() => of([{title: 'hello'}]));
      component.ngOnInit();
      component.form.controls.favouriteMovie.setValue('set');
      expect(getMovies).toHaveBeenCalled();
    }));
  })
});
