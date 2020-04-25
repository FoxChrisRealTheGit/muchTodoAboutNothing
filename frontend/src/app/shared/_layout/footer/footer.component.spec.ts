/* Angular imports */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
/* Module imports */
// import { MaterialModule } from '../material.module';
import { AppModule } from "../../../app.module";
/* Component imports */
import { FooterComponent } from "../footer/footer.component";

/*
 * Start tests for FooterComponent
 */
describe("FooterComponent", () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [AppModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
/*
 * End Tests
 */
