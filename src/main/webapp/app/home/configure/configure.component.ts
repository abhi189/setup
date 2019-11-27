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
    public configurations: any = [];
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
                imageUrl: 'https://d3rbhwp8vebia6.cloudfront.net/installersetupweb/Three-phase.png'
            },
            {
                id: 2,
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
                type: 'Delta',
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
                content: 'Cellular Modem',
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
        console.log('Form: ', name, value);
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
            case 'ctType': {
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
        this.configurationDone = false;
        if (this.allScreens.indexOf(this.currentScreen) === 0) {
            this.showPreviousButton = false;
        } else {
            this.showPreviousButton = true;
        }
        this.handleButtonState();
    }

    handleNextClick() {
        console.log('Curr Screen: ', this.currentScreen);
        if (this.validateScreenData()) {
            this.currentScreen = this.getNextStep();
            this.isNextEnabled = false;
            if (this.configurationDone) {
                this.handleDoneClick();
                return;
            }
            if (this.allScreens.indexOf(this.currentScreen) === this.allScreens.length - 1) {
                this.configurationDone = true;
            }
            this.showPreviousButton = this.isPreviousEnabled = true;
        }
        this.handleButtonState();
    }

    handleDoneClick = () => {
        this.currentScreen = 'configure';
        this.configurations = [...this.configurations, this.formData];
        this.formData = {};
        this.configurationDone = false;
        this.showPreviousButton = false;
    };

    handleAddConfiguration(event) {
        this.currentScreen = 'devices';
        event.stopPropagation();
    }
}
