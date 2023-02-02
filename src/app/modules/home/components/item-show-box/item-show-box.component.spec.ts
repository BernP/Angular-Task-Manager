import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemShowBoxComponent } from './item-show-box.component';

describe('ItemShowBoxComponent', () => {
  let component: ItemShowBoxComponent;
  let fixture: ComponentFixture<ItemShowBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemShowBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemShowBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
