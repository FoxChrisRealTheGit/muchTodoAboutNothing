/* Angular imports */
import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
/* Module imports */
import { AppModule } from "./app.module";
/* Component imports */
import { AppComponent } from "./app.component";

/*
 * Start tests for AppComponent
 */
describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: []
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
/*
 * End tests
 */
