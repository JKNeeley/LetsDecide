import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCredentialsPopupComponent } from './edit-credentials-popup.component';

describe('EditCredentialsPopupComponent', () => {
  let component: EditCredentialsPopupComponent;
  let fixture: ComponentFixture<EditCredentialsPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCredentialsPopupComponent]
    });
    fixture = TestBed.createComponent(EditCredentialsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
