import { IMAGE_URL } from './../../app.constants';
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
    public idAlreadyExist: boolean;
    public macAddressNotFound: boolean;
    public incorrectMacAddressFormat: boolean;
    @Input() macAddress: string;
    @Input() configuration: any;
    @Output() onPreviousScreenClick = new EventEmitter();
    public allScreens: Array<string> = [];
    public loadingEquipment: boolean;
    public apiControllers: Array<any> = [];
    public statusError: boolean;
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

    imageUrl = IMAGE_URL;
    
    constructControllers(controllers): void {
        this.isNextEnabled = false;
        this.fcontrollers = Array.prototype.slice.call(controllers);
        this.cd.detectChanges();
        this.fetchFCControllersStatus();
    }

    fetchFCControllersStatus(): void {
        const fcontrollersWithStatus = [...this.fcontrollers];
        const totalFcControllers = fcontrollersWithStatus.reduce((acc, curr) => curr && curr.inventoryItemTypeCode === 'FACILITY_CONTROLLER_MHA' ? acc + 1 : acc, 0)
        let count = 0;
        for (let i = 0; i < fcontrollersWithStatus.length;  i += 1) {
            if (fcontrollersWithStatus[i].inventoryItemTypeCode !== 'FACILITY_CONTROLLER_MHA') continue;
            fcontrollersWithStatus[i].isFc = true;
            fcontrollersWithStatus[i].loading = true;
            fcontrollersWithStatus[i].statusError = false;
            this.cd.detectChanges();
            setTimeout((i) => {
                this.settingsService.getFcControllerStatus(fcontrollersWithStatus[i].id)
                .subscribe(res => {
                    fcontrollersWithStatus[i].loading = false;
                    fcontrollersWithStatus[i].statusError = false;
                    fcontrollersWithStatus[i].status = res.body;
                    this.fcontrollers[i] = {
                        ...fcontrollersWithStatus[i]
                    };
                    this.cd.detectChanges();
                }, err => {
                    fcontrollersWithStatus[i].loading = false;
                    fcontrollersWithStatus[i].statusError = true;
                    fcontrollersWithStatus[i].status = false;
                    this.fcontrollers[i] = {
                        ...fcontrollersWithStatus[i]
                    };
                    this.cd.detectChanges();
                })
            }, i * 100, i)
        }
    }

    identify(fc) {
        return fc.id;
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
        this.macAddressNotFound = false;
        this.incorrectMacAddressFormat = false;
        this.idAlreadyExist = false;
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
        this.macAddressNotFound = false;
        this.incorrectMacAddressFormat = false;
        this.idAlreadyExist = false;
        if (this.selectedConf && this.currentScreen === 'installers') {
            this.sendToScreen = this.currentScreen = 'configure';
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
        this.settingsService
            .getFcControllersBySmappee(this.configuration.store.id, this.apiControllersByCode['FACILITY_CONTROLLER_MHA'].id)
            .subscribe(
                res => {
                    this.loadingControllers = false;
                    this.smappeeControllers = res.body;
                    this.cd.detectChanges();
                },
                err => {
                    this.loadingControllers = false;
                    this.cd.detectChanges();
                }
            );
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
        this.macAddressNotFound = false;
        this.idAlreadyExist = false;
        this.incorrectMacAddressFormat = false;
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
                this.onError(err);
                this.cd.detectChanges();
            }
        );
        delete this.formData['external_id']; //GA -- BDOG-288, Remove external_id value once the device with that externalId is created.
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

    private onError(error) {
        const detail = error.error.detail;
        const message = error.error.message;
        if (message === 'mac.address.fc.not.found') {
            this.macAddressNotFound = true;
        } else if (message === 'mac.address.fc.incorrect.format') {
            this.incorrectMacAddressFormat = true;
        } else if (message === 'inventoryitem.with.externalid.already.exists' || detail.includes('query did not return a unique result')) {
            this.idAlreadyExist = true;
        } else {
            this.createFcError = true;
        }
    }
}
