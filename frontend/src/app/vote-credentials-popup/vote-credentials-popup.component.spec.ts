import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteCredentialsPopupComponent } from './vote-credentials-popup.component';

describe('CredentialsPopupComponent', () => {
  let component: VoteCredentialsPopupComponent;
  let fixture: ComponentFixture<VoteCredentialsPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoteCredentialsPopupComponent]
    });
    fixture = TestBed.createComponent(VoteCredentialsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
