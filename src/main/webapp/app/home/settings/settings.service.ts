import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { SERVER_API_URL } from '../../app.constants';

@Injectable({ providedIn: 'root' })
export class SettingsService {
    constructor(private http: HttpClient) {}

    getStores(login): Observable<HttpResponse<any>> {
        return this.http.get(`${SERVER_API_URL}inventory/api/inventory-items/installer/sites/${login}`, { observe: 'response' });
    }
}
