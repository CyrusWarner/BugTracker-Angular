import { UserService } from './shared/services/user-service.service';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const userServiceSpy = jasmine.createSpyObj('UserService', ['getUserFromLocalStorage'])
  let app: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: UserService, useValue: userServiceSpy}
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  describe('getUserFromLocalStorage', () => {
    it('should have been called', () => {
      app.ngOnInit()

      expect(userServiceSpy.getUserFromLocalStorage).toHaveBeenCalled()
    })
  })
});
