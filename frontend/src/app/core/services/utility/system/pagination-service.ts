/* Angular imports */
import { Injectable } from "@angular/core";

/**
 * Service to handle pagination
 */
@Injectable()
export class PaginationService {
  pages = [];
  page = 1;
  perPage = 10;

  constructor() { }

  /**
   *
   */
  paginate = (p) => {
    const page = this.page;
    const perPage = this.perPage;
    const from = (page * perPage) - perPage;
    const to = (page * perPage);
    return p.slice(from, to);
  } // end of paginate

  /**
   *
   */
  setPages = (data) => {
    this.pages = [];
    const numberOfPages = Math.ceil(data.length / this.perPage);
    for (let i = 1; i <= numberOfPages; i++) {
      this.pages.push(i);
    }
  } // end of set pages

  /**
   *
   */
  clearPagination = () => {
    this.pages = [];
    this.page = 1;
    this.perPage = 10;
  } // end of clear pagination

} // end UserInfoService class
