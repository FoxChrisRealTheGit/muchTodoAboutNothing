/* Angular imports */
import { Injectable } from "@angular/core";
import { HttpResponse } from "@angular/common/http";

@Injectable()
export class HttpCacheService {
  private requests: any = {};

  constructor() {}

  /**
   * adds request to cache
   */
  put(url: string, response: HttpResponse<any>): void {
    this.requests[url] = response;
  } // end of put

  /**
   * gets request from cache
   */
  get(url: string): HttpResponse<any> | undefined {
    return this.requests[url];
  } // end of get

  /**
   * invalidates url in cache
   */
  invalidateUrl(url: string): void {
    this.requests[url] = undefined;
  } // end of invalidateUrl

  /**
   * invalidates entire cache
   */
  invalidateCache(): void {
    this.requests = {};
  } // end of invalidateCache
} // end class
