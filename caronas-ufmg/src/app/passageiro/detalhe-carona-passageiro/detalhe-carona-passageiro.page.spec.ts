import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetalheCaronaPassageiroPage } from './detalhe-carona-passageiro.page';

describe('DetalheCaronaPassageiroPage', () => {
  let component: DetalheCaronaPassageiroPage;
  let fixture: ComponentFixture<DetalheCaronaPassageiroPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheCaronaPassageiroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalheCaronaPassageiroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
