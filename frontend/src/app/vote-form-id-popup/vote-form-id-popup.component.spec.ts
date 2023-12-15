import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteFormIdPopupComponent } from './vote-form-id-popup.component';

describe('VoteFormIdPopupComponent', () => {
  let component: VoteFormIdPopupComponent;
  let fixture: ComponentFixture<VoteFormIdPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoteFormIdPopupComponent]
    });
    fixture = TestBed.createComponent(VoteFormIdPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
