import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TareasTrabajoPage } from './tareas-trabajo.page';

describe('TareasTrabajoPage', () => {
  let component: TareasTrabajoPage;
  let fixture: ComponentFixture<TareasTrabajoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TareasTrabajoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
