/* Angular imports */
import { Injectable } from "@angular/core";

/**
 * Service to handle making forms
 */
@Injectable()
export class FormMakerService {
  constructor() { }

  makeForm(form) {
    let formBody = [];
    for (let property in form) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(form[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    const res = formBody.join("&");
    return res;
  }


} // end UserInfoService class
