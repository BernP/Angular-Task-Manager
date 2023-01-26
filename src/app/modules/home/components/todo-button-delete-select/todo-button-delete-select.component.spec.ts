import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoButtonDeleteSelectComponent } from './todo-button-delete-select.component';

describe('TodoButtonDeleteSelectComponent', () => {
  let component: TodoButtonDeleteSelectComponent;
  let fixture: ComponentFixture<TodoButtonDeleteSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoButtonDeleteSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoButtonDeleteSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
