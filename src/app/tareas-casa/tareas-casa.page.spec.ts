import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TareasCasaPage } from './tareas-casa.page';

describe('TareasCasaPage', () => {
  let component: TareasCasaPage;
  let fixture: ComponentFixture<TareasCasaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TareasCasaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
