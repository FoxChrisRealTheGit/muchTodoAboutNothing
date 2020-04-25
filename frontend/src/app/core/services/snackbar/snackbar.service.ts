/* Angular imports */
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
/* Service imports */
import { UserInfoService } from "../utility/system/user-information.service";
/* Interface imports */

/* helper functions */
import levelUpChecker from "../../../../js/avatar-utility-functions/checkers/level-up-checker";

/**
 * Service to handle the things for popups and popup related things
 */
@Injectable()
export class SnackbarService {
  constructor(
    private snackBar: MatSnackBar,
    private userInfo: UserInfoService
  ) { }

  /**
   * Switches message based on type
   * @param name - name of item
   * @param type - type of item (used in switch)
   * @param slot - used for spells
   */
  EquipSnack(name: string, type: string, slot: number) {
    switch (type) {
      case "spell":
        this.snackBar.open(`Equiped ${name} in slot ${slot}!`, "close", {
          duration: 2000
        });
        return;
      case "head":
        this.snackBar.open(`Equiped ${name} in head slot!`, "close", {
          duration: 2000
        });
        return;
      case "body":
        this.snackBar.open(`Equiped ${name} in body slot!`, "close", {
          duration: 2000
        });
        return;
      case "legs":
        this.snackBar.open(`Equiped ${name} in legs slot!`, "close", {
          duration: 2000
        });
        return;
      case "hands":
        this.snackBar.open(`Equiped ${name} in hands slot!`, "close", {
          duration: 2000
        });
        return;
      default:
        this.snackBar.open(`Equiped ${name}!`, "close", {
          duration: 2000
        });
        return;
    }
  } // end of EquipSnack


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
