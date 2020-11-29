import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BakeComponent } from './bake.component';

describe('BakeComponent', () => {
  let component: BakeComponent;
  let fixture: ComponentFixture<BakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BakeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
