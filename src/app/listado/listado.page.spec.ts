import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { ListadoPage } from './listado.page';

describe('ListadoPage', () => {
  let component: ListadoPage;
  let fixture: ComponentFixture<ListadoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoPage],
      providers: [
        provideRouter([]),
        provideIonicAngular()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a list of items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('ion-item');
    expect(items.length).toBeGreaterThan(0);
  });
});
