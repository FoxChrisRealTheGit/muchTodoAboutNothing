/* Angular imports */
import { Injectable } from "@angular/core";
import {
  Router,
  Route,
  CanLoad,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";

/* Service imports */
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  /**
   *
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLoggedIn(state.url);
  } // end of canActivate

  /**
   *
   */
  canLoad(route: Route): boolean {
    return this.checkLoggedIn(route.path);
  } // end of canLoad

  /**
   *
   */
  checkLoggedIn(url: string): boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    }
    this.auth.redirectUrl = url;
    this.router.navigate(["/login"]);
    return false;
  } // end of checkLoggedIn
} // end class
