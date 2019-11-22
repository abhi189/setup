import { Component, Input, Output, OnChanges, EventEmitter, SimpleChanges, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { BrowserMultiFormatReader } from '@zxing/library';

@Component({
    templateUrl: './fc.component.html',
    styleUrls: ['./fc.component.scss'],
    selector: 'jhi-location-fc',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Fcs implements OnInit {
    @Input() fcs: Array<any>;
    public fcSelected: any = {};
    @Output() onItemSelected = new EventEmitter();
    @Output() setMacAddress = new EventEmitter<string>();
    public id: string;
    public codeReader: any;
    public macAddress: string = '';

    constructor() {
        // const data = {
        //     macAddress: this.fcSelected.macAddress
        // }
    }

    // handleMacAddressChange(macAddress: string) {
    //     this.setMacAddress.emit(macAddress);
    // }

    ngOnInit() {
        this.codeReader = new BrowserMultiFormatReader();
    }

    keyDownMac(macAddress) {
        this.setMacAddress.emit(macAddress);
    }

    startScanning(type): void {
        this.startReading(type);
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
                this.macAddress = result;
                this.stopScanning();
            })
            .catch(err => console.error(err));
    }

    stopScanning(): void {
        this.codeReader.reset();
        if (this.macAddress) {
        }
    }

    // onChangeMacAddress (macAddress: string) {
    //     this.fcSelected.macAddress = macAddress;
    // }
}
