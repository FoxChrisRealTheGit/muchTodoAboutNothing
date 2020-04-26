/* Angular imports */
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
/* Service imports */

/* Interface imports */

/* helper functions */


/**
 * Service to handle the things for popups and popup related things
 */
@Injectable()
export class SnackbarService {
  constructor(
    private snackBar: MatSnackBar
  ) { }

  /**
   * General Message Snack
   * @param msg - message to be shown in snackbar
   */
  GeneralMessageSnack = (msg: string) => {
    this.snackBar.open(msg, "close", {
      duration: 2000
    });
  } // end of GeneralMessageSnack
} // end of class
