import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TareasWorkoutPage } from './tareas-workout.page';

describe('TareasWorkoutPage', () => {
  let component: TareasWorkoutPage;
  let fixture: ComponentFixture<TareasWorkoutPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TareasWorkoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
