/* Angular imports */
import { TestBed } from "@angular/core/testing";
/* Service imports */
import { DialogSizeService } from "./modal-size.service";

describe("DialogSizeService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: DialogSizeService = TestBed.get(DialogSizeService);
    expect(service).toBeTruthy();
  });
});
