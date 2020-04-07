import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, forkJoin } from 'rxjs';
import { SERVER_API_URL } from '../../app.constants';

// const SERVER_API_URL = 'https://qa1ms.budderfly.com/';

@Injectable({ providedIn: 'root' })
export class SettingsService {
    constructor(private http: HttpClient) {}

    getStores(budderflyId): Observable<HttpResponse<any>> {
        return this.http.get(`${SERVER_API_URL}/sites/api/sites/sites-by-budderfly-id-permission/${budderflyId}`, { observe: 'response' });
    }

    getStoreDetailsByIds(budderflyIds): Observable<any> {
        const observableArray = budderflyIds.map(id => this.getStores(id));

        return forkJoin(observableArray);
    }

    getAllStores(): Observable<HttpResponse<any>> {
        return this.http.get(`${SERVER_API_URL}/sites/api/sites/all/filtered`, { observe: 'response' });
    }

    getConfiguredEquipments(budderflyId: any): Observable<HttpResponse<any>> {
        return this.http.get(`${SERVER_API_URL}inventory/api/inventory-items?budderflyId.equals=${budderflyId}`, { observe: 'response' });
    }

    getUnConfiguredEquipments(): Observable<HttpResponse<any>> {
        return this.http.get(`${SERVER_API_URL}inventory/api/inventory-item-types/`, { observe: 'response' });
    }

    createFCController(payload): Observable<any> {
        return this.http.post(`/inventory/api/inventory-items-permission`, payload);
    }

    deleteFCController(payload): Observable<any> {
        return this.http.delete(`/inventory/api/inventory-items-permission/${payload}`, { observe: 'response' });
    }

    getFcControllerStatus(fcId): Observable<any> {
        return this.http.get(`${SERVER_API_URL}/inventory/api/inventory-items/status/${fcId}`, { observe: 'response' });
    }

    getFcControllersBySmappee(budderflyId, inventoryId): Observable<HttpResponse<any>> {
        return this.http.get(
            `${SERVER_API_URL}/inventory/api/inventory-items?budderflyId.equals=${budderflyId}&inventoryItemTypeId.equals=${inventoryId}`,
            { observe: 'response' }
        );
    }

    getEquipmentType(): Observable<HttpResponse<any>> {
        return this.http.get(`${SERVER_API_URL}/inventory/api/known-equipment-types`, { observe: 'response' });
    }

    getEquipments(budderflyId, inventoryItemTypeId): Observable<HttpResponse<any>> {
        return this.http.get(
            `${SERVER_API_URL}/inventory/api/equipment/monitor-details/budderfly-id/${budderflyId}/item-type/${inventoryItemTypeId}`,
            {
                observe: 'response'
            }
        );
    }

    createEquipment(budderflyId, payload): Observable<any> {
        return this.http.post(
            `${SERVER_API_URL}/inventory/api/create-equipment-for-installer-permission?budderflyId=${budderflyId}`,
            payload
        );
    }

    createServiceType(connection = 'DELTA', payload, service): Observable<any> {
        return this.http.post(
            `/inventory/api/inventory-items/installer-permission/location/service-type/${service}/connection-type/${connection}`,
            payload
        );
    }

    getLoadedConfigurations(smappeeId): Observable<HttpResponse<any>> {
        return this.http.get(`${SERVER_API_URL}/inventory/api/monitors?inventoryItemId.equals=${smappeeId}`, { observe: 'response' });
    }

    deleteConfiguredItem(item): Observable<any> {
        return this.http.delete(`${SERVER_API_URL}/inventory/api/load-configuration-permission/${item.id}`, { observe: 'response' });
    }

    deleteDevice(item): Observable<any> {
        return this.http.delete(`${SERVER_API_URL}/inventory/api/delete-unmonitored-equipment/${item.id}`, { observe: 'response' });
    }

    getCtTypes(): Observable<HttpResponse<any>> {
        return this.http.get(`${SERVER_API_URL}/inventory/api/load-configuration/ct-types`, { observe: 'response' });
    }

    getCtSetups(inventoryId): Observable<HttpResponse<any>> {
        return this.http.get(`${SERVER_API_URL}/inventory/api/load-configuration/ct-setup/inventory-item-id/${inventoryId}`, {
            observe: 'response'
        });
    }

    getCtLinePhasess(): Observable<HttpResponse<any>> {
        return this.http.get(`${SERVER_API_URL}/inventory/api/load-configuration/ct-line-phases`, { observe: 'response' });
    }

    updateConfiguration(payload): Observable<any> {
        return this.http.post(`${SERVER_API_URL}/inventory/api/load-configuration-permission/`, payload);
    }

    getUTCDateString(): string {
        const currentDate = new Date();

        return currentDate.toUTCString();
    }
}
