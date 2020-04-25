/* Angular imports */
import { Injectable } from "@angular/core";

/**
 * Service to handle the POM
 */
@Injectable()
export class PageLoadService {
  loading = false;   // global flag to check if loading is happening

  constructor() { }

  /**
   * Toggles the loading action
   */
  toggleLoading = (): void => {
    this.loading = !this.loading;
  } // end of togglePOM
} // end UserInfoService class
