import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class CoreService {
    constructor(private cookieSvc: CookieService){}

    getCookie(): string {        
        const cookie = this.cookieSvc.get(environment.COOKIE);

        if(typeof cookie !== "undefined" && cookie !== null && cookie !== "") {
            return cookie;
        } else {
            return null;
        }
    }

    setCookie(jwt: string): boolean {
        this.cookieSvc.set(environment.COOKIE, jwt);

        return true;
    }
}