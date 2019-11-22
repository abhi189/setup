import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges, OnInit } from '@angular/core';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Component({
    templateUrl: './Fcontrollers.component.html',
    styleUrls: ['./Fcontrollers.component.scss'],
    selector: 'jhi-controllers-config',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FcontrollerComponents implements OnInit {
    @Input() fcontrollers: Array<any> = [];
    public steps: any = {
        controllers: '',
        fcs: ''
    };
    public fcs: Array<any> = [];
    public showNextButton: boolean;
    public currentScreen: string;
    public showPreviousButton: boolean;
    public isNextEnabled: boolean;
    public isPreviousEnabled: boolean;
    public formData: any = {};
    public controllerSelected: any = {};
    public controllersConf: any = [];
    public controllersConfigured: boolean;
    public configurationDone: boolean;
    @Input() macAddress: string;
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
        controllers: [
            {
                id: 3,
                content: 'Facility Controller',
                imageUrl: 'http://d3rbhwp8vebia6.cloudfront.net/installersetupweb/FC.png'
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
        fcs: [
            {
                id: 1,
                macAddress: '00:0a:95:9d:68:16',
                imageUrl: 'http://d3rbhwp8vebia6.cloudfront.net/installersetupweb/FC.png'
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

    // keyDownMac($event) {
    //     console.log(this.macAddress);
    // }

    getNextStep() {
        let currentScreenIndex = this.allScreens.indexOf(this.currentScreen);

        if (currentScreenIndex < this.allScreens.length - 1) {
            currentScreenIndex = currentScreenIndex + 1;
        }
        if (this.currentScreen === 'controllers' && this.formData.controller.id === 1) {
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

    keyDownMac() {}

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
            case 'controllers': {
                if (this.formData['controller']) {
                    return true;
                }
                break;
            }
            case 'fcs': {
                if (this.formData['fc']) {
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
        this.controllersConfigured = false;
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
            if (this.controllersConfigured) {
                this.handleDoneClick();
                return;
            }
            if (this.allScreens.indexOf(this.currentScreen) === this.allScreens.length - 1) {
                this.controllersConfigured = true;
            }
            this.showPreviousButton = this.isPreviousEnabled = true;
        }
        this.handleButtonState();
    }

    handleDoneClick = () => {
        this.currentScreen = 'configure';
        this.fcontrollers = [...this.fcontrollers, this.formData];
        this.formData = {};
        this.controllersConfigured = false;
        this.showPreviousButton = false;
    };

    handleAddConfiguration(event) {
        this.currentScreen = 'controllers';
        event.stopPropagation();
    }
}
