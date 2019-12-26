import { Component, Input, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { SettingsService } from '../settings/settings.service';
import { forkJoin } from 'rxjs';

@Component({
    templateUrl: './f-controllers.component.html',
    styleUrls: ['./f-controllers.component.scss'],
    selector: 'jhi-controllers-config',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FcontrollersComponent implements OnInit {
    @Input() fcontrollers: Array<any> = [];
    public steps: any = {
        installers: '',
        controllers: '',
        smappee: '',
        fcs: '',
        configure: ''
    };
    public fcs: Array<any> = [];
    public showNextButton: boolean;
    public currentScreen: string;
    public showPreviousButton: boolean;
    public isNextEnabled: boolean;
    public isPreviousEnabled: boolean;
    public formData: any = {};
    public controllersConfigured: boolean;
    public createFcError: boolean;
    @Input() macAddress: string;
    @Input() configuration: any;
    @Output() onPreviousScreenClick = new EventEmitter();
    public data = {
        stores: [],
        controllers: [
            {
                id: 3,
                content: 'Facility Controller',
                imageUrl: 'http://d3rbhwp8vebia6.cloudfront.net/installersetupweb/FC.png',
                code: 'FACILITY_CONTROLLER_MHA'
            },
            {
                id: 2,
                content: 'Network Router',
                imageUrl: 'http://d3rbhwp8vebia6.cloudfront.net/installersetupweb/Router.png',
                code: 'NETWORK_ROUTER'
            },
            {
                id: 1,
                content: 'Smappee Meter',
                imageUrl: 'http://d3rbhwp8vebia6.cloudfront.net/installersetupweb/Smappee.png',
                code: 'SMAPPEE'
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
                type: 'HVAC'
            },
            {
                id: 2,
                type: 'Freezer'
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
                type: 'Exhaust'
            },
            {
                id: 8,
                type: 'Lighting'
            },
            {
                id: 9,
                type: 'WaterHeater'
            },
            {
                id: 10,
                type: 'HeatPump'
            },
            {
                id: 11,
                type: 'PowerSoakStation'
            },
            {
                id: 12,
                type: 'POS'
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
    public loadingEquipment: boolean;
    public apiControllers: Array<any> = [];
    public apiControllersByCode: any = {};
    public showError: boolean;
    public deleteError: boolean;
    public deleteController: boolean;
    public selectedController: any;
    public showConfirmDelete: boolean;
    public sendToScreen: string;
    public selectedConf: any = {};
    public loadingControllers: boolean;
    public smappeeControllers: any = [];

    constructor(private settingsService: SettingsService, private cd: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.showNextButton = this.showPreviousButton = this.isPreviousEnabled = true;
        this.allScreens = Object.keys(this.steps);
        this.currentScreen = this.allScreens[0];
        this.formData['controller'] = undefined;
        this.formData = {
            ...this.configuration,
            ...this.formData
        };
        this.getConfiguredEquipmentsAndUnconfigured();
    }

    getConfiguredEquipmentsAndUnconfigured(): void {
        this.loadingEquipment = true;
        this.showError = false;
        forkJoin(
            this.settingsService.getConfiguredEquipments(this.configuration.store.id),
            this.settingsService.getUnConfiguredEquipments()
        ).subscribe(
            res => {
                this.loadingEquipment = false;
                this.constructControllers(res[0].body);
                this.constructNewEquipments(res[1].body);
                this.cd.detectChanges();
            },
            err => {
                this.loadingEquipment = false;
                this.showError = true;
                this.cd.detectChanges();
            }
        );
    }

    constructControllers(controllers): void {
        this.isNextEnabled = false;
        this.fcontrollers = Array.prototype.slice.call(controllers);
        this.cd.detectChanges();
    }

    constructNewEquipments(unConfiguredConterollers): void {
        this.apiControllers = Array.prototype.slice.call(unConfiguredConterollers);
        this.apiControllersByCode = {};
        this.apiControllers.map(controller => {
            const { code } = controller;
            if (!this.apiControllersByCode[code]) {
                this.apiControllersByCode[code] = Object.assign({}, controller);
            }
            return Object.assign({}, controller);
        });
    }

    getNextStep() {
        let currentScreenIndex = this.allScreens.indexOf(this.currentScreen);

        if (currentScreenIndex < this.allScreens.length - 1) {
            currentScreenIndex = currentScreenIndex + 1;
        }
        if (this.currentScreen === 'controllers' && (this.formData.controller && this.formData.controller.code !== 'SMAPPEE')) {
            currentScreenIndex += 1;
        }
        return this.allScreens[currentScreenIndex];
    }

    getPreviousStep() {
        let currentScreenIndex = this.allScreens.indexOf(this.currentScreen);

        if (currentScreenIndex > 0) {
            currentScreenIndex = currentScreenIndex - 1;
        }
        if (this.currentScreen === 'fcs' && (this.formData.controller && this.formData.controller.code !== 'SMAPPEE')) {
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
        this.sendToScreen = undefined;
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
            case 'fcs' || 'external_id': {
                if (this.formData['external_id']) {
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
            case 'smappee': {
                if (this.formData['smappeeController']) {
                    return true;
                }
                break;
            }
            default:
                return true;
        }
    }

    handlePreviousClick() {
        this.createFcError = false;
        if (!this.currentScreen || this.allScreens.indexOf(this.currentScreen) === 0) {
            this.onPreviousScreenClick.next();
        } else {
            this.currentScreen = this.getPreviousStep();
            this.isNextEnabled = this.isPreviousEnabled = true;
            this.controllersConfigured = false;
            this.showPreviousButton = true;
        }
        this.handleButtonState();
    }

    handleNextClick() {
        const { controller } = this.formData;

        this.createFcError = false;
        if (this.selectedConf && this.currentScreen === 'installers') {
            this.sendToScreen = this.currentScreen =  'configure';
            this.selectedConf = {};
            return;
        }
        if (this.validateScreenData()) {
            const currentScreen = this.getNextStep();

            this.isNextEnabled = false;
            if (this.controllersConfigured) {
                this.handleDoneClick();
                return;
            }
            if (currentScreen === 'configure' && (controller && controller.code !== 'SMAPPEE')) {
                this.handleCreateFcController('installers');
                return;
            }
            if (controller.code === 'SMAPPEE' && currentScreen === 'smappee') {
                this.getSmappeeControllers();
                return;
            }
            if (controller.code === 'SMAPPEE' && this.formData['smappeeController'] && this.formData['external_id']) {
                this.handleCreateFcController('configure');
                return;
            }
            this.currentScreen = currentScreen;
            this.showPreviousButton = this.isPreviousEnabled = true;
        }
        this.handleButtonState();
    }

    addDevices(smapee) {
        if (smapee.inventoryItemTypeCode === 'SMAPPEE') {
            this.selectedConf = smapee;
            this.formData['controller'] = smapee;
            this.isNextEnabled = true;
        }
    }

    onSendToPreviousModule(screen) {
        this.currentScreen = screen;
        this.getConfiguredEquipmentsAndUnconfigured();
    }

    getSmappeeControllers() {
        this.currentScreen = 'smappee';
        this.loadingControllers = true;
        this.settingsService.getFcControllersBySmappee(this.configuration.store.id, this.apiControllersByCode['FACILITY_CONTROLLER_MHA'].id)
        .subscribe(res => {
            this.loadingControllers = false;
            this.smappeeControllers = res.body;
            this.cd.detectChanges();
        }, err => {
            this.loadingControllers = false;
            this.cd.detectChanges();
        });
    }

    handleCreateFcController(nextScreen): void {
        const controller = this.apiControllersByCode[this.formData['controller']['code']];
        const payload = {
            name: controller ? controller.name : 'NETWORK ROUTER',
            budderflyId: this.configuration.store.id,
            inventoryItemTypeId: controller ? controller.id : 5,
            externalId: this.formData['external_id']
        };

        this.createFcError = false;
        this.settingsService.createFCController(payload).subscribe(
            res => {
                this.currentScreen = nextScreen;
                if (this.currentScreen === 'installers') {
                    this.formData['controller'] = undefined;
                    this.getConfiguredEquipmentsAndUnconfigured();
                }
                this.formData['createdFc'] = res;
                this.cd.detectChanges();
            },
            err => {
                this.createFcError = true;
                this.cd.detectChanges();
            }
        );
    }

    deleteFcController(controller) {
        this.selectedController = controller;
        this.showConfirmDelete = true;
        this.deleteError = false;
    }

    cancelDelete() {
        this.selectedController = undefined;
        this.showConfirmDelete = false;
    }

    continueDelete() {
        if (!this.selectedController) return;
        this.deleteController = true;
        this.deleteError = false;
        this.settingsService.deleteFCController(this.selectedController.id).subscribe(
            res => {
                this.showConfirmDelete = false;
                this.deleteController = false;
                this.getConfiguredEquipmentsAndUnconfigured();
                this.cd.detectChanges();
            },
            err => {
                this.showConfirmDelete = true;
                this.deleteController = false;
                this.deleteError = true;
                this.cd.detectChanges();
            }
        );
    }

    handleControllerPreviousClick(event) {
        this.currentScreen = 'installers';
        this.getConfiguredEquipmentsAndUnconfigured();
    }

    handlePreviousStepClick(event) {
        this.currentScreen = 'fcs';
    }

    handleDoneClick = () => {
        this.currentScreen = 'configure';
        this.formData = {};
        this.controllersConfigured = false;
        this.showPreviousButton = false;
    };

    handleAddConfiguration(event) {
        this.currentScreen = 'controllers';
        event.stopPropagation();
    }
}
