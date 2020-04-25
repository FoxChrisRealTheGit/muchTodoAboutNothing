/* Angular imports */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
/* Module imports */
// import { MaterialModule } from '../material.module';
import { AppModule } from "../../../app.module";
/* Component imports */
import { HeaderComponent } from "./header.component";

/*
 * Start tests for HeaderComponent
 */
describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [AppModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
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
