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
    @Input() errorMessageDetail: string;
    public fcSelected: any = {};
    @Output() onItemSelected = new EventEmitter();
    @Output() setMacAddress = new EventEmitter<string>();
    @Output() setIdentifier = new EventEmitter();
    public id: string;
    public codeReader: any;
    public macAddress: string = '';
    public showScanner: boolean;
    public identifier: string;
    public timeout: any;
    public isRearCamera: boolean = true;
    private videoElement: HTMLVideoElement;

    constructor(private cd: ChangeDetectorRef) {
        // const data = {
        //     macAddress: this.fcSelected.macAddress
        // }
    }

    onIdentifierChange(identifier: any) {
        this.setIdentifier.next({ name: 'identifier', value: identifier.target.value });
    }

    handleMacAddressChange(macAddress: string) {
        this.setMacAddress.emit(macAddress);
    }

    ngOnInit() {
        this.showScanner = false;
        this.onItemSelected.next({ name: 'external_id', value: '' });
        this.setCodeReader(true);
        this.isRearCamera = true;
    }

    setCodeReader(create) {
        if (!this.codeReader || create) {
            this.codeReader = new BrowserMultiFormatReader();
        }
    }

    startScanning(type): void {
        this.showScanner = !this.showScanner;
        if (!this.showScanner) {
            this.stopScanning(true);
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
        // this.startReading('');
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
                if (this.formData.controller && this.formData.controller.code === 'NETWORK_ROUTER') {
                    resultValue = this.formatNetworkRouter(resultValue);
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
        if (!scanner)
            setTimeout(() => {
                this.setCodeReader(true);
                this.startReading('');
            }, 10);
        if (this.macAddress) {
        }
    }

    formatNetworkRouter(text) {
        let formattedText = '',
            textArr = text.replace(/[- )(]/g, '');

        for (let i = 1, len = textArr.length; i <= len; i += 1) {
            formattedText += textArr[i - 1];
            if (i !== len && i % 4 === 0) {
                formattedText += '-';
            }
        }
        return formattedText;
    }

    onTextChange(event: any): void {
        const value = event.target.value;
        let resultValue = value;

        this.onItemSelected.next({ name: 'external_id', value: '' });
        if (!resultValue) return;
        if (this.formData.controller && this.formData.controller.code === 'NETWORK_ROUTER' && value.length === 12) {
            resultValue = this.formatNetworkRouter(value);
        }
        if (this.formData.controller && this.formData.controller.code === 'FACILITY_CONTROLLER_MHA') {
            resultValue = this.removeText(value);
        }
        this.macAddress = resultValue;
        this.onItemSelected.next({ name: 'external_id', value: resultValue });
    }
}
