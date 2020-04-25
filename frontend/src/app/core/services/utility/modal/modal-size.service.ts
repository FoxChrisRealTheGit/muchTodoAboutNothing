/* Angular imports */
import { Injectable } from "@angular/core";
import { MatDialogConfig } from "@angular/material";


/**
 * Service to regulate the modal sizes
 */
@Injectable({
  providedIn: "root"
})
export class DialogSizeService {
  MatDialog = new MatDialogConfig();

  constructor() { }


  /**
   *  The smallest dialog size
   */
  getMicroDialog = (): MatDialogConfig => {
    this.MatDialog.width = "30%";
    this.MatDialog.height = "20%";
    return this.MatDialog;
  } // end getMicroDialog


  /**
   *  The second smallest dialog size
   */
  getSmallDialog = (): MatDialogConfig => {
    this.MatDialog.width = "40%";
    this.MatDialog.height = "30%";
    return this.MatDialog;
  } // end getSmallDialog


  /**
   * The middle dialog size
   */
  getMediumDialog = (): MatDialogConfig => {
    this.MatDialog.width = "50%";
    this.MatDialog.height = "40%";
    // this.MatDialog.maxHeight = "700px";
    // this.MatDialog.maxWidth = "300px";
    return this.MatDialog;
  } // end getMediumDialog


  /**
   * The second largest dialog size
   */
  getLargeDialog = (): MatDialogConfig => {
    this.MatDialog.width = "60%";
    this.MatDialog.height = "50%";
    return this.MatDialog;
  } // end getLargeDialog


  /**
   * The largest dialog size
   */
  getExtraLargeDialog = (): MatDialogConfig => {
    this.MatDialog.width = "70%";
    this.MatDialog.height = "70%";
    return this.MatDialog;
  } // end getLargeDialog
} // end class
