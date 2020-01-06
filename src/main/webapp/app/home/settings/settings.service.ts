import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, forkJoin } from 'rxjs';
import { SERVER_API_URL } from '../../app.constants';

// const SERVER_API_URL = 'https://qa1ms.budderfly.com/';

@Injectable({ providedIn: 'root' })
export class SettingsService {
    constructor(private http: HttpClient) {}

    getBudderflyId(login): Observable<HttpResponse<any>> {
        return this.http.get(`${SERVER_API_URL}/authenticate/api/user-sites-shops/${login}`, { observe: 'response' });
    }

    getStores(budderflyId): Observable<HttpResponse<any>> {
        return this.http.get(`${SERVER_API_URL}/sites/api/sites/sites-by-budderfly-id/${budderflyId}`, { observe: 'response' });
    }

    getStoreDetailsByIds(budderflyIds): Observable<any> {
        const observableArray = budderflyIds.map(id => this.getStores(id))
        
        return forkJoin(observableArray);
    }

    getConfiguredEquipments(budderflyId: any): Observable<HttpResponse<any>> {
        return this.http.get(`${SERVER_API_URL}inventory/api/inventory-items?budderflyId.equals=${budderflyId}`, { observe: 'response' });
    }

    getUnConfiguredEquipments(): Observable<HttpResponse<any>> {
        return this.http.get(`${SERVER_API_URL}inventory/api/inventory-item-types/`, { observe: 'response' });
    }

    createFCController(payload): Observable<any> {
        return this.http.post(`/inventory/api/inventory-items`, payload);
    }

    deleteFCController(payload): Observable<any> {
        return this.http.delete(`/inventory/api/inventory-items/${payload}`, { observe: 'response' });
    }

    getFcControllersBySmappee(budderflyId, inventoryId): Observable<HttpResponse<any>> {
        return this.http.get(`${SERVER_API_URL}/inventory/api/inventory-items?budderflyId.equals=${budderflyId}&inventoryItemTypeId.equals=${inventoryId}`, { observe: 'response'});
    }

    getEquipmentType(): Observable<HttpResponse<any>> {
        return this.http.get(`${SERVER_API_URL}/inventory/api/equipment-types`, { observe: 'response'});
    }

    getEquipments(budderflyId): Observable<HttpResponse<any>> {
        return this.http.get(`${SERVER_API_URL}/inventory/api/equipment/by-budderfly-id/${budderflyId}`, { observe: 'response' });
    }

    createEquipment(budderflyId, payload): Observable<any> {
        return this.http.post(`${SERVER_API_URL}/inventory/api/create-equipment-for-installer?budderflyId=${budderflyId}`, payload);
    }

    createServiceType(connection = 'DELTA', payload, service): Observable<any> {
        return this.http.post(`/inventory/api/inventory-items/installer/location/service-type/${service}/connection-type/${connection}`, payload);
    }

    getLoadedConfigurations(smappeeId): Observable<HttpResponse<any>> {
        return this.http.get(`${SERVER_API_URL}/inventory/api/monitors?inventoryItemId.equals=${smappeeId}`, { observe : 'response' });
    }

    deleteConfiguredItem(item): Observable<any> {
        return this.http.delete(`${SERVER_API_URL}/inventory/api/load-configuration/${item.id}`, { observe : 'response' });
    }

    getCtTypes(): Observable<HttpResponse<any>> {
        return this.http.get(`${SERVER_API_URL}/inventory/api/load-configuration/ct-types`, { observe : 'response' });
    }

    getCtSetups(): Observable<HttpResponse<any>> {
        return this.http.get(`${SERVER_API_URL}/inventory/api/load-configuration/ct-setup`, { observe : 'response' });
    }

    getCtLinePhasess(): Observable<HttpResponse<any>> {
        return this.http.get(`${SERVER_API_URL}/inventory/api/load-configuration/ct-line-phases`, { observe : 'response' });
    }

    updateConfiguration(payload): Observable<any> {
        return this.http.post(`${SERVER_API_URL}/inventory/api/load-configuration/`, payload);
    }
}
