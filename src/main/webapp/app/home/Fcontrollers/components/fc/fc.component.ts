import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { BrowserMultiFormatReader } from '@zxing/library';

@Component({
    templateUrl: './fc.component.html',
    styleUrls: ['./fc.component.scss'],
    selector: 'jhi-location-fc',
})
export class Fcs implements OnInit {
    @Input() fcs: Array<any>;
    @Input() formData: any;
    @Input() errorMessage: string;
    public fcSelected: any = {};
    @Output() onItemSelected = new EventEmitter();
    @Output() setMacAddress = new EventEmitter<string>();
    public id: string;
    public codeReader: any;
    public macAddress: string = '';
    public fcController: boolean;
    public ncController: boolean;
    public showScanner: boolean;    
    public timeout: any;

    constructor(private cd: ChangeDetectorRef) {
        // const data = {
        //     macAddress: this.fcSelected.macAddress
        // }
    }

    handleMacAddressChange(macAddress: string) {
        this.setMacAddress.emit(macAddress);
    }

    ngOnInit() {
        this.showScanner = false;
        this.onItemSelected.next({ name: 'external_id', value: '' });
        this.codeReader = new BrowserMultiFormatReader();
    }

    startScanning(type): void {
        this.showScanner = !this.showScanner;
        if (!this.showScanner) {
            this.stopScanning();
            return;
        }
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => {
            this.startReading(type);
        }, 0)
    }

    startReading(type): void {
        this.codeReader
            .listVideoInputDevices()
            .then(videoInputDevices => {
                this.scanDocument(videoInputDevices, type);
            })
            .catch(err => console.error(err));
    }

    scanDocument(devices: any = [], type): void {
        const firstDeviceId = devices.length ? devices[0].deviceId : undefined;
        this.codeReader
            .decodeFromInputVideoDevice(firstDeviceId, 'video')
            .then(result => {
                console.log('Result: ', result);
                this.macAddress = result.text;
                this.stopScanning();
                this.onItemSelected.next({ name: 'external_id', value: result.text})
                this.cd.detectChanges();
            })
            .catch(err => console.error(err));
    }

    stopScanning(): void {
        this.showScanner = false;
        this.codeReader.reset();
        if (this.macAddress) {
        }
    }

    getScanType(): string {
        const controller = this.formData.controller.code;

        switch (controller) {
            case 'FACILITY_CONTROLLER_MHA':
                return 'Mac Address';
            case 'MODEM':
                return 'IMEI NUMBNER';
            default:
                return 'Serial Number';
        }
    }

    onTextChange(event: any): void {
        const value = event.target.value;

        this.onItemSelected.next({ name: 'external_id', value: '' });
        if (!value) return;
        this.macAddress = value;
        this.onItemSelected.next({ name: 'external_id', value });
    }
}
