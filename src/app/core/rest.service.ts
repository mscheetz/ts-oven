import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';
import { IDough } from '../classes/dough.interface';

@Injectable({providedIn: 'root'})
export class RestService {
    constructor(private http: HttpClient) {}
    
    getToken(): Observable<string> {
        const endpoint = environment.LOGIN;
        const url = `${environment.APIHOST}${endpoint}`;

        return this.http.get<string>(url);
    }

    bake(dough: IDough): Observable<Blob> {
        const endpoint = environment.BAKE;
        const url = `${environment.APIHOST}${endpoint}`;

        return this.http.post(url, dough, { responseType: 'blob' });
    }

    address(symbol: string): Observable<string> {
        const endpoint = `${environment.ADDRESS}/${symbol}`;
        const url = `${environment.APIHOST}${endpoint}`;

        return this.http.get(url, {responseType: 'text'});
    }
}