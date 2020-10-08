import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';
import { Dough } from '../classes/dough.class';

@Injectable({providedIn: 'root'})
export class RestService {
    constructor(private http: HttpClient) {}
    
    getToken(): Observable<string> {
        var endpoint = environment.LOGIN;
        var url = `${environment.APIHOST}${endpoint}`;

        return this.http.get<string>(url);
    }

    bake(dough: Dough): Observable<string> {
        var endpoint = environment.BAKE;
        var url = `${environment.APIHOST}${endpoint}`;

        return this.http.post<string>(url, dough);
    }
}