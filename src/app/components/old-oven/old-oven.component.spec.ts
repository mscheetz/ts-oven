import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldOvenComponent } from './old-oven.component';

describe('OldOvenComponent', () => {
  let component: OldOvenComponent;
  let fixture: ComponentFixture<OldOvenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldOvenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OldOvenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
