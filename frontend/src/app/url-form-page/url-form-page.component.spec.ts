import { ComponentFixture, TestBed } from '@angular/core/testing';

import { URLFormPageComponent } from './url-form-page.component';

describe('URLFormPageComponent', () => {
  let component: URLFormPageComponent;
  let fixture: ComponentFixture<URLFormPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [URLFormPageComponent]
    });
    fixture = TestBed.createComponent(URLFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
