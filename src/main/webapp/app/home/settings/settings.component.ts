import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../core/login/login.service';
import { BehaviorSubject } from 'rxjs';
import { BrowserQRCodeReader, BrowserCodeReader, BrowserBarcodeReader } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
    selector: 'jhi-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    public showNextButton: boolean;
    public currentScreen: string;
    public showPreviousButton: boolean;
    public isNextEnabled: boolean;
    public isPreviousEnabled: boolean;
    public formData: any = {};
    public storeSelected: any = {};
    public configurationDone: boolean;
    public data = {
        stores: [
            {
                id: 'SUBW-7383',
                address: '2 Trap Falls Rd',
                city: 'Shelton',
                state: 'MA',
                zip: '06088',
                online: false
            },
            {
                id: 'SUBW-3434',
                address: '2 Trap Falls Rd',
                city: 'Shelton',
                state: 'MA',
                zip: '06088',
                online: true
            },
            {
                id: 'OLYM-8393',
                address: '2 Trap Falls Rd',
                city: 'Shelton',
                state: 'MA',
                zip: '06088',
                online: true
            },
            {
                id: 'KFC-2322',
                address: '2 Trap Falls Rd',
                city: 'Shelton',
                state: 'MA',
                zip: '06088',
                online: false
            },
            {
                id: 'OLYM-3232',
                address: '2 Trap Falls Rd',
                city: 'Shelton',
                state: 'MA',
                zip: '06088',
                online: false
            },
            {
                id: 'SUBW-3433',
                address: '2 Trap Falls Rd',
                city: 'Shelton',
                state: 'MA',
                zip: '06088',
                online: true
            },
            {
                id: 'SUBW-9302',
                address: '2 Trap Falls Rd',
                city: 'Shelton',
                state: 'MA',
                zip: '06088',
                online: true
            },
            {
                id: 'KFC-3398',
                address: '2 Trap Falls Rd',
                city: 'Shelton',
                state: 'MA',
                zip: '06088',
                online: false
            }
        ],
        services: [
            {
                id: 1,
                phase: 5,
                content: 'Three Phase 120/208 or 277/480',
                imageUrl: '../../../../../content/images/split-phase.png'
            },
            {
                id: 2,
                phase: 3,
                content: 'Split Phase 120/240',
                imageUrl: '../../../../../content/images/three-phase.png'
            }
        ],
        connections: [
            {
                id: 1,
                type: 'WYE',
                imageUrl: '../../../../../content/images/wye.png'
            },
            {
                id: 2,
                type: 'Delta',
                imageUrl: '../../../../../content/images/delta.png'
            }
        ]
    };

    steps = {
        location: '',
        services: '',
        connections: '',
        configure: ''
    };

    availableDevices: MediaDeviceInfo[];
    currentDevice: MediaDeviceInfo = null;
    hasDevices: boolean;
    hasPermission: boolean;

    qrResultString: string = '';

    torchEnabled = false;
    torchAvailable$ = new BehaviorSubject<boolean>(false);
    tryHarder = false;
    public allScreens: Array<string> = [];
    public codeReader: any;
    constructor(private loginService: LoginService) {}

    ngOnInit(): void {
        this.currentScreen = 'location';
        this.showNextButton = true;
        this.allScreens = this.currentScreen === 'configure' ? Object.keys(this.steps.configure) : Object.keys(this.steps);
        this.codeReader = new BrowserQRCodeReader();

        // const reader = new ZXingScannerComponent();
    }

    onCamerasFound(devices: MediaDeviceInfo[]): void {
        this.availableDevices = devices;
        this.hasDevices = Boolean(devices && devices.length);
    }

    onCodeResult(resultString: string) {
        this.qrResultString = resultString;
    }

    onDeviceSelectChange(selected: string) {
        const device = this.availableDevices.find(x => x.deviceId === selected);
        this.currentDevice = device || null;
    }

    onHasPermission(has: boolean) {
        this.hasPermission = has;
    }

    onTorchCompatible(isCompatible: boolean): void {
        this.torchAvailable$.next(isCompatible || false);
    }

    startScanning(type): void {
        switch (type) {
            case 'qr':
                this.codeReader = new BrowserQRCodeReader();
            case 'bar':
                this.codeReader = new BrowserBarcodeReader();
        }
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
        let decoder = this.codeReader.decodeFromInputVideoDevice(firstDeviceId, 'video');

        if (type === 'bar') {
            decoder = this.codeReader.decodeOnceFromVideoDevice(firstDeviceId, 'video');
        }

        decoder
            .then(result => {
                this.qrResultString = result;
            })
            .catch(err => console.error(err));
    }

    stopScanning(): void {
        this.codeReader.reset();
        if (this.qrResultString) {
        }
    }

    getNextStep() {
        let currentScreenIndex = this.allScreens.indexOf(this.currentScreen);

        if (currentScreenIndex < this.allScreens.length - 1) {
            currentScreenIndex = currentScreenIndex + 1;
        }
        if (this.currentScreen === 'services' && this.formData.service.id === 1) {
            currentScreenIndex += 1;
        }
        return this.allScreens[currentScreenIndex];
    }

    getPreviousStep() {
        let currentScreenIndex = this.allScreens.indexOf(this.currentScreen);

        if (currentScreenIndex > 0) {
            currentScreenIndex = currentScreenIndex - 1;
        }
        if (this.currentScreen === 'configure' && this.formData.service.id === 1) {
            currentScreenIndex -= 1;
        }
        return this.allScreens[currentScreenIndex];
    }

    handleItemSelected(data) {
        this.updateForm(data);
    }

    updateForm({ name, value }) {
        this.formData = {
            ...this.formData,
            [name]: value
        };
        this.handleButtonState();
    }

    handleButtonState() {
        if (this.validateScreenData()) {
            this.isNextEnabled = true;
        } else {
            this.isNextEnabled = false;
        }
    }

    validateScreenData() {
        switch (this.currentScreen) {
            case 'location': {
                if (this.formData['store']) {
                    return true;
                }
                break;
            }
            case 'services': {
                if (this.formData['service']) {
                    return true;
                }
                break;
            }
            case 'connections': {
                if (this.formData['connection']) {
                    return true;
                }
                break;
            }
            case 'configure': {
                if (this.formData['configure']) {
                    return true;
                }
                break;
            }
            default:
                return true;
        }
    }

    handlePreviousClick() {
        this.currentScreen = this.getPreviousStep();
        this.isNextEnabled = true;
        if (this.allScreens.indexOf(this.currentScreen) === 0) {
            this.showPreviousButton = false;
        } else {
            this.showPreviousButton = true;
        }
        this.handleButtonState();
    }

    handleNextClick() {
        if (this.validateScreenData()) {
            this.currentScreen = this.getNextStep();
            this.isNextEnabled = false;
            if (this.allScreens.indexOf(this.currentScreen) === this.allScreens.length - 1) {
                // this.configurationDone = true;
            }
            this.showPreviousButton = this.isPreviousEnabled = true;
        }
    }

    handleLogout() {
        this.loginService.logout();
    }
}
