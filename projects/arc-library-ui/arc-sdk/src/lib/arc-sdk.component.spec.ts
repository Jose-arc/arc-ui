import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcSdkComponent } from './arc-sdk.component';

describe('ArcSdkComponent', () => {
  let component: ArcSdkComponent;
  let fixture: ComponentFixture<ArcSdkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArcSdkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArcSdkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
