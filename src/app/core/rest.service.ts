import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';
import { IDough } from '../classes/dough.interface';
import { env } from 'yargs';

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

    getVersions(packageName: string): Observable<string[]> {
        const endpoint = `${environment.VERSIONS}?package=${packageName}`;
        const url = `${environment.APIHOST}${endpoint}`;

        return this.http.get<string[]>(url);
    }
}