import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, SimpleChanges, OnInit } from '@angular/core';
import { SettingsService } from '../settings/settings.service';

@Component({
    templateUrl: './meter.component.html',
    styleUrls: ['./meter.component.scss'],
    selector: 'jhi-location-meter',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeterComponent implements OnInit {
    @Input() meter: Array<any> = [];
    public steps: any = {
        services: '',
        connections: '',
        configure: ''
    };
    @Input() configuration: any = {}
    @Output() onPreviousScreenClick = new EventEmitter();
    @Output() onpreviousStepClick=  new EventEmitter();
    @Output() onSendToPreviousModule = new EventEmitter();
    @Input() sendToScreen: string;
    public showNextButton: boolean;
    public currentScreen: string;
    public showPreviousButton: boolean;
    public isNextEnabled: boolean;
    public isPreviousEnabled: boolean;
    public formData: any = {};
    public storeSelected: any = {};
    public configurations: any = [];
    public configurationDone: boolean;
    public createServiceTypeError: string;
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
                name: 'THREE_PHASE',
                phase: 5,
                content: 'Three Phase 120/208 or 277/480',
                imageUrl: 'https://d3rbhwp8vebia6.cloudfront.net/installersetupweb/Three-phase.png'
            },
            {
                id: 2,
                name: 'SPLIT_PHASE',
                phase: 3,
                content: 'Split Phase 120/240',
                imageUrl: 'https://d3rbhwp8vebia6.cloudfront.net/installersetupweb/Split-Phase.png'
            }
        ],
        connections: [
            {
                id: 1,
                type: 'WYE',
                imageUrl: 'https://d3rbhwp8vebia6.cloudfront.net/installersetupweb/wye.png'
            },
            {
                id: 2,
                type: 'DELTA',
                imageUrl: 'https://d3rbhwp8vebia6.cloudfront.net/installersetupweb/delta.png'
            }
        ],
        controllers: [
            {
                id: 4,
                content: 'Facility Controller',
                imageUrl: 'http://d3rbhwp8vebia6.cloudfront.net/installersetupweb/FC.png'
            },
            {
                id: 3,
                content: 'cellular Modem',
                imageUrl: 'http://d3rbhwp8vebia6.cloudfront.net/installersetupweb/Modem.png'
            },
            {
                id: 2,
                content: 'Network Router',
                imageUrl: 'http://d3rbhwp8vebia6.cloudfront.net/installersetupweb/Router.png'
            },
            {
                id: 1,
                content: 'Smappee Meter',
                imageUrl: 'http://d3rbhwp8vebia6.cloudfront.net/installersetupweb/Smappee.png'
            }
        ],
        devices: [
            {
                id: 1,
                type: 'HVAC Unit 1'
            },
            {
                id: 2,
                type: 'HVAC Unit 2'
            },
            {
                id: 3,
                type: 'Main'
            },
            {
                id: 4,
                type: 'Cooler'
            },
            {
                id: 5,
                type: 'Bread Oven'
            },
            {
                id: 6,
                type: 'Speed Oven'
            },
            {
                id: 7,
                type: 'HVAC Unit 1'
            },
            {
                id: 8,
                type: 'HVAC Unit 2'
            },
            {
                id: 9,
                type: 'Main'
            },
            {
                id: 10,
                type: 'Cooler'
            },
            {
                id: 11,
                type: 'Bread Oven'
            },
            {
                id: 12,
                type: 'Speed Oven'
            }
        ],
        phases: [
            {
                id: 1,
                type: '1'
            },
            {
                id: 2,
                type: '2'
            },
            {
                id: 3,
                type: '3'
            }
        ],
        ctTypes: [
            {
                id: 1,
                type: 'SCT02-T10/50A'
            },
            {
                id: 2,
                type: 'SCT02-T16/100A'
            },
            {
                id: 3,
                type: 'SCT02-T24/200A'
            }
        ],
        ctSetup: [
            {
                id: 1,
                type: 'CT Input: A'
            },
            {
                id: 2,
                type: 'CT Input: B'
            },
            {
                id: 3,
                type: 'CT Input: C'
            },
            {
                id: 4,
                type: 'CT Input: D'
            },
            {
                id: 5,
                type: 'CT Input: E'
            },
            {
                id: 6,
                type: 'CT Input: F'
            }
        ],
        ctPhase: [
            {
                id: 1,
                type: 'L1'
            },
            {
                id: 2,
                type: 'L2'
            },
            {
                id: 3,
                type: 'L3'
            }
        ]
    };
    public allScreens: Array<string> = [];

    constructor(
        private settingsService: SettingsService,
        private cd: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        this.formData = {
            ...this.configuration
        }
        console.log(this.formData);
        this.showNextButton = this.showPreviousButton = this.isPreviousEnabled = true;
        this.allScreens = Object.keys(this.steps);
        this.currentScreen = this.sendToScreen ?  this.sendToScreen : this.allScreens[0];
        this.handleButtonState();
    }

    getNextStep() {
        let currentScreenIndex = this.allScreens.indexOf(this.currentScreen);

        if (currentScreenIndex < this.allScreens.length - 1) {
            currentScreenIndex = currentScreenIndex + 1;
        }
        if (this.currentScreen === 'services' && this.formData.service.id === 2) {
            currentScreenIndex += 1;
        }
        return this.allScreens[currentScreenIndex];
    }

    getPreviousStep() {
        let currentScreenIndex = this.allScreens.indexOf(this.currentScreen);

        if (currentScreenIndex === 0) return null;
        if (currentScreenIndex > 0) {
            currentScreenIndex = currentScreenIndex - 1;
        }
        if (this.currentScreen === 'services' && this.formData.service.id === 2) {
            currentScreenIndex += 1;
        }
        return this.allScreens[currentScreenIndex];
    }

    handleItemSelected(data) {
        this.updateForm(data);
    }

    handlePreviousScreenClick(event) {
        this.onPreviousScreenClick.next('stores');
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
        this.configurationDone = false;
        if (!this.currentScreen) {
            // this.showPreviousButton = false;
            this.onpreviousStepClick.next();
        } else {
            this.showPreviousButton = true;
        }
        this.handleButtonState();
    }

    handleNextClick() {
        if (this.validateScreenData()) {
            const currentScreen = this.getNextStep();
            if (this.allScreens.indexOf(currentScreen) === this.allScreens.length - 1) {
                this.createServiceType(currentScreen);
                return;
            }
            this.currentScreen = currentScreen;
            this.isNextEnabled = false;
            if (this.configurationDone) {
                this.handleDoneClick();
                return;
            }
            this.showPreviousButton = this.isPreviousEnabled = true;
        }
        this.handleButtonState();
    }

    createServiceType(screen) {
        console.log(this.configuration, this.formData);
        const { smappeeController: createdFc } = this.configuration;
        const payload = {
            "id": createdFc ? createdFc.id : '',
            "budderflyId": createdFc ? createdFc.budderflyId : '',
            "code": createdFc ? createdFc.inventoryItemTypeCode : '',
            "name": createdFc ? createdFc.name : '',
            "externalId": createdFc ? createdFc.externalId : '',
        }
        const connection = this.formData.connection ? this.formData.connection.type : 'DELTA';
        const service = this.formData.service ? this.formData.service.name : '';

        this.createServiceTypeError = '';
        this.settingsService.createServiceType(
            connection, payload, service
        )
        .subscribe(res => {
            this.currentScreen = screen;
            this.cd.detectChanges();
        }, err => {
            this.currentScreen = screen;
            this.createServiceTypeError = 'Something went wrong.'
            this.cd.detectChanges();
        })
    }

    sendToPreviousModule(screen) {
        this.onSendToPreviousModule.next(screen);
    }

    handlePreviousStepClick(event) {
        this.currentScreen = event;
        this.handleButtonState();
    }

    handleDoneClick = () => {
        this.currentScreen = 'configure';
        this.configurations = [...this.configurations, this.formData];
        this.formData = {};
        this.configurationDone = false;
    };

    handleAddConfiguration(event) {
        this.currentScreen = 'services';
        event.stopPropagation();
    }
}
