/* Angular imports */
import { Injectable } from "@angular/core";

/**
 * Service to handle modals and modal related things
 */
@Injectable({
  providedIn: "root"
})
export class ModalHandelingService {
  currentModal;    // global access to currently opened modal

  constructor() { }

  /**
   * Sets the current modal
   * @param thing - the modal to set
   */
  setThething = (thing): void => {
    this.currentModal = thing;
  } // end of setTheThing


  /**
   *  Resets the current modal
   */
  resetThething = (): void => {
    this.currentModal = undefined;
  } // end of resetTheThing
} // end class
