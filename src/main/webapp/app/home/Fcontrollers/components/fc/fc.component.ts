import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { BrowserMultiFormatReader } from '@zxing/library';

@Component({
    templateUrl: './fc.component.html',
    styleUrls: ['./fc.component.scss'],
    selector: 'jhi-location-fc'
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
    public showScanner: boolean;
    public timeout: any;
    public isRearCamera: boolean = true;
    private videoElement: HTMLVideoElement;

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
        this.isRearCamera = true;
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
        }, 0);
    }

    getBackCamera(devices: any) {
        if (devices.length === 1) return devices[0].deviceId;
        let backCamera = undefined;

        for (const device of devices) {
            if (/back|rear|environment/gi.test(device.label)) {
                backCamera = device;
                break;
            }
        }
        return backCamera ? backCamera.deviceId : devices[0].deviceId;
    }

    getFrontCamera(devices: any) {
        if (devices.length === 1) return devices[0].deviceId;
        let frontCamera = undefined;

        for (const device of devices) {
            if (/front|environment/gi.test(device.label)) {
                frontCamera = device;
                break;
            }
        }
        return frontCamera ? frontCamera.deviceId : devices[0].deviceId;
    }

    enableTorch() {
        if (this.videoElement && this.videoElement.srcObject) {
            if ('getVideoTracks' in this.videoElement.srcObject) {
                this.videoElement.srcObject.getVideoTracks()[0].applyConstraints({ advanced: [{ torch: true }] });
            }
        }
    }

    startReading(type): void {
        this.codeReader
            .listVideoInputDevices()
            .then(videoInputDevices => {
                this.scanDocument(videoInputDevices, type);
            })
            .catch(err => console.error(err));
    }

    switchCamera(): void {
        if (!this.showScanner) return;
        this.isRearCamera = !this.isRearCamera;
        this.stopScanning(false);
        this.startReading('');
    }

    scanDocument(devices: any = [], type): void {
        const firstDeviceId = this.isRearCamera ? this.getBackCamera(devices) : this.getFrontCamera(devices);
        let resultValue = undefined;
        this.codeReader
            .decodeOnceFromVideoDevice(firstDeviceId, 'video')
            .then(result => {
                this.macAddress = result.text;
                this.stopScanning(true);
                if (result && result.text) {
                    resultValue = this.removeText(result.text);
                }
                this.onItemSelected.next({ name: 'external_id', value: resultValue });
                this.cd.detectChanges();
            })
            .catch(err => {
                console.error(err);
            });
    }

    removeText(text: string) {
        if (text.split(': ').length > 1) {
            return text.split(': ')[1];
        }
        return text.split(': ')[0];
    }

    stopScanning(scanner): void {
        if (scanner) this.showScanner = false;
        this.codeReader.reset();
        if (this.macAddress) {
        }
    }

    getFormat(): string {
        const format = this.formData.controller.code;

        switch (format) {
            case 'FACILITY_CONTROLLER_MHA':
                return '(Format: 00-00-00-00-00-00)';
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
