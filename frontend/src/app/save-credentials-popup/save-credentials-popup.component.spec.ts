import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveCredentialsPopupComponent } from './save-credentials-popup.component';

describe('SaveCredentialsPopupComponent', () => {
  let component: SaveCredentialsPopupComponent;
  let fixture: ComponentFixture<SaveCredentialsPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveCredentialsPopupComponent]
    });
    fixture = TestBed.createComponent(SaveCredentialsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
