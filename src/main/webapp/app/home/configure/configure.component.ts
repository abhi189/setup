import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges, OnInit } from '@angular/core';

@Component({
    templateUrl: './configure.component.html',
    styleUrls: ['./configure.component.scss'],
    selector: 'jhi-location-configure',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigurationComponent implements OnInit {
    @Input() configures: Array<any> = [];
    public steps: any = {
        devices: '',
        phases: '',
        ctType: '',
        ctSetup: '',
        ctPhases: ''
    };
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
        ],
        devices: [
            {
                id: 1,
                type: 'HVAC Unit 1',
            },
            {
                id: 2,
                type: 'HVAC Unit 2',
            },
            {
                id: 3,
                type: 'Main',
            },
            {
                id: 4,
                type: 'Cooler',
            },
            {
                id: 5,
                type: 'Bread Oven',
            },
            {
                id: 6,
                type: 'Speed Oven',
            },
            {
                id: 7,
                type: 'HVAC Unit 1',
            },
            {
                id: 8,
                type: 'HVAC Unit 2',
            },
            {
                id: 9,
                type: 'Main',
            },
            {
                id: 10,
                type: 'Cooler',
            },
            {
                id: 11,
                type: 'Bread Oven',
            },
            {
                id: 12,
                type: 'Speed Oven',
            }
        ],
        phases: [
            {
                id: 1,
                type: 'WYE',
            },
            {
                id: 2,
                type: 'Delta',
            }
        ],
    };
    public allScreens: Array<string> = [];

    constructor() {}

    ngOnInit(): void {
        this.showNextButton = true;
        this.allScreens = Object.keys(this.steps);
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
            case 'devices': {
                if (this.formData['device']) {
                    return true;
                }
                break;
            }
            case 'ctTypes': {
                if (this.formData['ctType']) {
                    return true;
                }
                break;
            }
            case 'phases': {
                if (this.formData['phase']) {
                    return true;
                }
                break;
            }
            case 'ctSetup': {
                if (this.formData['ctSetup']) {
                    return true;
                }
                break;
            }
            case 'ctPhases': {
                if (this.formData['ctPhase']) {
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
                this.configurationDone = true;
            }
            this.showPreviousButton = this.isPreviousEnabled = true;
        }
    }

    handleAddConfiguration(event) {
        this.currentScreen = 'devices';
        event.stopPropagation();
    }
}
