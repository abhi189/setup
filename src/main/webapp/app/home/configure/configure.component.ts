import { Phases } from './components/phases/phases.component';

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { SettingsService } from '../settings/settings.service';

@Component({
    templateUrl: './configure.component.html',
    styleUrls: ['./configure.component.scss'],
    selector: 'jhi-location-configure',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigurationComponent implements OnInit {
    @Input() configures: Array<any> = [];
    @Input() configuration: any = {};
    @Output() onPreviousScreenClick = new EventEmitter();
    @Output() onPreviousStepClick = new EventEmitter();
    @Output() sendToPreviousModule = new EventEmitter();
    public steps: any = {
        default: '',
        devices: '',
        equipments: '',
        phases: '',
        ctType: '',
        ctSetup: '',
        ctPhases: '',
    };
    public showNextButton: boolean;
    public currentScreen: string;
    public showPreviousButton: boolean;
    public isNextEnabled: boolean;
    public isPreviousEnabled: boolean;
    public formData: any = {};
    public storeSelected: any = {};
    public loadingEquipment: boolean;
    public showConfirmAdd: any = {};
    public loadingControllers:boolean;
    public showError: boolean;
    public configurations: any = [];
    public equipmentTypes: Array<any> = [];
    public equipments: Array<any>;
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
                type: 'Freezer'
            },
            {
                id: 2,
                type: 'Exhaust'
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
                type: 'Water Heater'
            },
            {
                id: 8,
                type: 'Speed Oven'
            },
            {
                id: 9,
                type: 'Heat Pump'
            },
            {
                id: 10,
                type: 'Power Soak Station'
            },
            {
                id: 11,
                type: 'POS'
            },
            {
                id: 12,
                type: 'Microwave'
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
        ctTypes: [],
        ctSetup: [],
        ctPhase: []
    };
    public allScreens: Array<string> = [];
    public showDoneBtn: boolean;
    public showConfirmDelete: boolean;
    public phasesCount: number;
    public selectedCtPhases: Array<any> = [];
    public deleteError: boolean;
    public selectedCtSetups: Array<any> = [];
    @Input() sendToScreen: string;
    public creatingEquipment: boolean;
    public showConfirmModal: any = {};
    public loadingConfiguredItems: boolean;
    public configuredItems: any = [];
    public selectedConfiguredItem: any;
    public loadingData: boolean;
    public originalCtTypes: any = [];
    public originalCtPhases: any = [];
    public originalCtSetup: any = [];
    public configuringEquipmentError: string;
    public configuringEquipment: boolean;
    constructor(private settingsService: SettingsService, private cd: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.showNextButton = false;
        this.phasesCount = 1;
        this.showDoneBtn = this.showPreviousButton = this.isPreviousEnabled =  true;
        this.allScreens = Object.keys(this.steps);
        this.getConfiguredItems();
    }

    getNextStep() {
        let currentScreenIndex = this.allScreens.indexOf(this.currentScreen);

        if (currentScreenIndex < this.allScreens.length - 1) {
            currentScreenIndex = currentScreenIndex + 1;
        }
        if (this.currentScreen === 'services' && (this.formData.service && this.formData.service.id === 1)) {
            currentScreenIndex += 1;
        }
        if (this.currentScreen === 'devices') {
            currentScreenIndex += 1;
        }
        return this.allScreens[currentScreenIndex];
    }

    getPreviousStep() {
        let currentScreenIndex = this.allScreens.indexOf(this.currentScreen);

        if (currentScreenIndex > 0) {
            currentScreenIndex = currentScreenIndex - 1;
        }
        if (this.currentScreen === 'configure' && (this.formData.service && this.formData.service.id === 1)) {
            currentScreenIndex -= 1;
        }
        if (this.currentScreen === 'phases' && !this.formData.equipmentif) {
            currentScreenIndex -= 1;
        }
        return this.allScreens[currentScreenIndex];
    }

    handleItemSelected(data) {
        this.updateForm(data);
    }

    updateCtSetups(ctSetup) {
        // if (!this.selectedCtSetups) return;
        const currentCtSetups = ctSetup;
        const updatedCtSetups = currentCtSetups.filter((ctSetup) => {
            if (this.selectedCtSetups.find((elm) => elm.channel === ctSetup.channel)) {
                return false;
            }
            return true;
        })

        this.data.ctSetup = [...updatedCtSetups];
    }

    updateConfiguration() {
        this.configuringEquipment = true;
        this.configuringEquipmentError = '';
        let payload = {
            budderflyId: this.configuration.store.id,
            numberOfPhases: this.formData.phase.type,
            ctTypeCode: this.formData.ctType.code,
            equipmentId: this.formData.equipment ? this.formData.equipment.id : this.formData.device ? this.formData.device.id : '',
            inventoryItemId: this.configuration.createdFc ? this.configuration.createdFc.id
            : this.configuration.controller ? this.configuration.controller.id : '',
        };
        const channels = ['A', 'B', 'C'];
        
        if (this.configuration.smappeeController) {
            payload['facilityControllerInventoryItemId'] =  this.configuration.smappeeController.id;
        }
        if (this.selectedCtSetups.length) {
            this.selectedCtSetups.forEach((setup, index) => {
                payload[`ctInputPhase${channels[index]}`] = setup.channel;
            })
        }
        if (this.selectedCtPhases.length) {
            this.selectedCtPhases.forEach((setup, index) => {
                payload[`ctLinePhase${channels[index]}`] = setup.code;
            })
        }
        console.log(this.configuration, this.formData);
        this.settingsService.updateConfiguration(payload)
        .subscribe(res => {
            this.handleDoneClick();
            this.configuringEquipment = false;
            this.cd.detectChanges();
        }, err => {
            this.configuringEquipment = false;
            this.configuringEquipmentError = 'Something went wrong';
            this.cd.detectChanges();
        })
    }

    updateCtPhases(ctPhase) {
        // if (!this.selectedCtPhases) return;
        const currentCtPhases = ctPhase;
        const updatedCtPhases = currentCtPhases.filter((CtPhase) => {
            if (this.selectedCtPhases.find((elm) => elm.code === CtPhase.code)) {
                return false;
            }
            return true;
        })

        this.data.ctPhase = [...updatedCtPhases];
    }

    getEquipmentTypes(){
        this.loadingEquipment = true
        this.settingsService.getEquipmentType().subscribe(
            res => {
                this.loadingEquipment = false;
                this.equipmentTypes = res.body;
                this.cd.detectChanges();
            },
            err => {
                this.loadingEquipment = false;
                this.showError = true;
                this.cd.detectChanges();
            }
        );
    }

    getConfiguredItems() {
        const { createdFc = {}, controller = {} } = this.configuration;

        this.loadingConfiguredItems = true;
        this.showError = false;
        this.settingsService.getLoadedConfigurations(createdFc.id || controller.id || '')
        .subscribe(res => {
            this.loadingConfiguredItems = false;
            this.configuredItems = res.body || [];
            this.cd.detectChanges();
        }, err => {
            this.loadingConfiguredItems = false;
            this.showError = true;
            this.cd.detectChanges();
        })
    }

    continueDelete() {
        if (this.selectedConfiguredItem) {
            this.deleteError= false;
            this.settingsService.deleteConfiguredItem(this.selectedConfiguredItem)
            .subscribe(res => {
                this.showConfirmDelete = false;
                this.getConfiguredItems();
                this.cd.detectChanges();
            },
            err => {
                this.deleteError = true;
                this.cd.detectChanges();
            })
        }
    }

    getCtTypes() {
        this.loadingData = true;
        this.settingsService.getCtTypes()
        .subscribe(res => {
            this.loadingData = false;
            this.originalCtTypes = res.body || [];
            this.data.ctTypes = [...this.originalCtTypes]
            this.cd.detectChanges();
        }, err => {
            this.loadingData = false
            this.cd.detectChanges();
        })
    }

    getCtSetups() {
        this.loadingData = true
        this.settingsService.getCtSetups()
        .subscribe(res => {
            this.loadingData = false;
            this.originalCtSetup = res.body || [];
            const ctSetup = [...this.originalCtSetup]
            
            this.updateCtSetups(ctSetup);
            this.cd.detectChanges();
        }, err => {
            this.loadingData = false
            this.cd.detectChanges();
        })
    }

    getCtLinePhases() {
        this.loadingData = true;
        this.settingsService.getCtLinePhasess()
        .subscribe(res => {
            this.loadingData = false;
            this.originalCtPhases = res.body || [];
            const ctPhase = [...this.originalCtPhases];
            this.updateCtPhases(ctPhase);
            this.cd.detectChanges();
        }, err => {
            this.loadingData = false;
            this.cd.detectChanges();
        })
    }

    getEquipments(){
        this.loadingEquipment = true
        this.settingsService.getEquipments(this.configuration.store.id).subscribe(
            res => {
                this.loadingEquipment = false;
                this.equipments = res.body || [];
                this.cd.detectChanges();
            },
            err => {
                this.loadingEquipment = false;
                this.showError = true;
                this.cd.detectChanges();
            }
        );
    }

    saveAndupdatectSetups(ctSetup) {
        this.selectedCtSetups = [
            ...this.selectedCtSetups,
            ctSetup
        ]
    }

    saveAndUpdatectPhases(ctPhase) {
        this.selectedCtPhases = [
            ...this.selectedCtPhases,
            ctPhase
        ]
    }

    countPhases() {
        return this.phasesCount += 1;
    }

    updateForm({ name, value }) {
        this.formData = {
            ...this.formData,
            [name]: value
        };
        this.handleButtonState();
    }

    handleButtonState() {
        if (this.validateScreenData(false)) {
            this.isNextEnabled = true;
        } else {
            this.isNextEnabled = false;
        }
    }

    validateScreenData(save) {
        switch (this.currentScreen) {
            case 'devices': {
                if (this.formData['device']) {
                    return true;
                }
                break;
            }
            case 'equipments': {
                if (this.formData['equipment']) {
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
                    if (save) this.saveAndupdatectSetups(this.formData['ctSetup']);
                    return true;
                }
                break;
            }
            case 'ctPhases': {
                if (this.formData['ctPhase']) {
                    if (save) this.saveAndUpdatectPhases(this.formData['ctPhase']);
                    return true;
                }
                break;
            }
            default:
                return true;
        }
    }

    createEquipment() {
        this.creatingEquipment = true;
        this.showConfirmModal =  Object.assign({}, {
            enable: true,
            showCancel: false,
            equipment: undefined,
        });
        this.settingsService.createEquipment(this.configuration.store.id, { id : this.formData && this.formData['equipment'].id , code : this.formData && this.formData['equipment'].code } )
        .subscribe(res => {
            this.showConfirmModal =  Object.assign({}, {
                enable: true,
                showCancel: false,
                equipment: res,
            });
            this.formData['equipment'] = res;
            this.creatingEquipment = false;
            this.cd.detectChanges();
        }, err => {
            this.showConfirmModal =  Object.assign({}, {
                enable: true,
                showCancel: true,
                equipment: 'Something went wrong Please try again.'
            });
            this.creatingEquipment = false;
            this.cd.detectChanges()
        })
    }

    handlePreviousClick() {
        this.currentScreen = this.getPreviousStep();
        this.isNextEnabled = true;
        this.configurationDone = false;
        if (this.currentScreen === 'default') {
            this.showDoneBtn = true;
            this.currentScreen = '';
        } else {
            this.showDoneBtn = false;
            if (!this.currentScreen) {
                if (this.sendToScreen) {
                    this.sendToPreviousModule.next('installers');
                    return;
                }
                if ( this.configuration.service && this.configuration.service.id === 2) {
                    // this.showPreviousButton = false;
                    this.onPreviousStepClick.next('services');
                } else {
                    this.onPreviousStepClick.next('connections');
                }
            } else {
                this.showPreviousButton = true;
            }
        }
        this.handleButtonState();
    }

    handleConfirmAddClick(event) {
        this.showConfirmModal = Object.assign({}, {
            enable: false,
        });
        if (event) {
            this.handleNextClick(true);
        }
    }

    handleNextClick(pass ?: boolean) {
        if (!pass && this.currentScreen === 'equipments') {
            this.createEquipment();
            return;
        }
        if (this.getNextStep() === 'ctType') {
            this.getCtTypes();
        }
        if (this.getNextStep() === 'ctSetup') {
            this.getCtSetups();
        }
        if (this.getNextStep() === 'ctPhases') {
            this.getCtLinePhases();
        }
        if (this.validateScreenData(true)) {
            this.isNextEnabled = false;
            if (this.configurationDone) {
                this.updateConfiguration();
                //this.handleDoneClick();
                return;
            }
            if (this.currentScreen === 'ctPhases') {
                if (this.formData['phase'] && this.formData['phase'].type <= this.phasesCount) {
                    this.configurationDone = true;
                } else {
                    this.countPhases();
                    this.currentScreen = 'ctSetup';
                    this.getCtSetups();
                    this.formData['ctSetup'] = this.formData['ctPhase'] = null;
                }
            } else {
                if (this.currentScreen === 'ctSetup' && this.formData['phase'] && this.formData['phase'].type <= this.phasesCount) {
                    this.configurationDone = true;
                }
                this.currentScreen = this.getNextStep();
            }
            this.showPreviousButton = this.isPreviousEnabled = true;
        }
        this.handleButtonState();
    }

    handleDoneClick = () => {
        this.currentScreen = 'configure';
        this.configurations = [...this.configurations, this.formData];
        this.formData = {};
        this.configurationDone = this.configuringEquipment = false;
        this.showDoneBtn = true;
        this.configuringEquipmentError = '';
        this.phasesCount = 1;
        this.selectedCtPhases = this.selectedCtSetups = [];
        this.getConfiguredItems();
    };

    handleAddEquipment(event) {
        this.currentScreen = 'equipments';
        this.getEquipmentTypes();
    }

    handleAddConfiguration(event) {
        this.currentScreen = 'devices';
        this.showDoneBtn = false;
        this.showNextButton = true;
        event.stopPropagation();
    }

    onDoneClick() {
        this.onPreviousScreenClick.next('stores');
    }
}
