import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TareasEstudiosPage } from './tareas-estudios.page';

describe('TareasEstudiosPage', () => {
  let component: TareasEstudiosPage;
  let fixture: ComponentFixture<TareasEstudiosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TareasEstudiosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
