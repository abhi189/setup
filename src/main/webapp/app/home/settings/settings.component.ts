import { commonErrorCodes, commonErrorMessages } from './../../shared/constants/error-codes.constants';
import { IMAGE_URL } from './../../app.constants';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../core/login/login.service';
import { SettingsService } from './settings.service';
import { AccountService } from '../../core/auth/account.service';

@Component({
    selector: 'jhi-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    @Output() onBackClick = new EventEmitter();
    public showNextButton: boolean;
    public currentScreen: string;
    public showPreviousButton: boolean;
    public isNextEnabled: boolean;
    public isPreviousEnabled: boolean;
    public formData: any = {};
    public loading: boolean;
    public budderflyId: string;
    public storeSelected: any = {};
    public configurationDone: boolean;
    public showError: string;
    public showErrorDetail: string;
    imageUrl = IMAGE_URL;
    public data = {
        stores: [],

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

        services: [
            {
                id: 2,
                phase: 5,
                content: 'Three Phase 120/208 or 277/480',
                imageUrl: 'https://d3rbhwp8vebia6.cloudfront.net/installersetupweb/Three-phase.png'
            },
            {
                id: 1,
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
        ]
    };

    steps = {
        location: '',
        controllers: '',
        configure: ''
    };
    public loadingStores: boolean;
    public allScreens: Array<string> = [];

    constructor(private loginService: LoginService, private settingsService: SettingsService, private accountService: AccountService) {}

    ngOnInit(): void {
        this.currentScreen = 'location';
        this.showNextButton = true;
        this.allScreens = this.currentScreen === 'controllers' ? Object.keys(this.steps.controllers) : Object.keys(this.steps);
        this.getBudderflyId();
        this.handleButtonState();
    }

    async getBudderflyId() {
        this.loadingStores = true;
        this.showError = '';
        this.settingsService.getAllStores().subscribe(
            res => {
                this.settingsService.getStoreDetailsByIds(res.body.map(s => s.budderflyId)).subscribe(r => {
                    this.loadingStores = false;
                    this.constructStores(r.map(a => a.body));
                });
            },
            ({ error }) => {
                this.loadingStores = false;
                this.showError = this.getErrorMessage(error['error']);
                this.showErrorDetail = this.getErrorDetail(error['message'] || error['error']);
            }
        );
    }

    getErrorMessage(code): string {
        const errorKeyMessage = {
            ...commonErrorMessages
        };

        return (
            errorKeyMessage[code] ||
            'There was an issue on the Server - Please try again. If the issue persists, Please contact customer support.'
        );
    }

    getErrorDetail(code): string {
        const errorKeyMessage = {
            ...commonErrorCodes
        };

        return errorKeyMessage[code] || `${this.settingsService.getUTCDateString()} : UNKNOWN`;
    }
    constructStores(stores: any = []): void {
        if (!stores) {
            return;
        }
        const finalStores = stores.map(store => {
            const { budderflyId, customerName, address, city, state, zip } = store;
            return {
                id: budderflyId,
                customerName,
                address,
                city,
                state,
                zip
            };
        });
        this.data.stores = Array.prototype.slice.call(finalStores);
    }

    handleControllerPreviousClick(event): void {
        this.currentScreen = 'location';
        this.showPreviousButton = false;
        this.isNextEnabled = true;
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

    handleBackClick() {
        this.currentScreen = 'location';
        this.showPreviousButton = false;
        this.getBudderflyId();
        this.handleButtonState();
    }

    getPreviousStep() {
        let currentScreenIndex = this.allScreens.indexOf(this.currentScreen);

        if (currentScreenIndex > 0) {
            currentScreenIndex = currentScreenIndex - 1;
        }
        if (this.currentScreen === 'controllers' && this.formData.service.id === 1) {
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
            case 'controllers': {
                if (this.formData['controllers']) {
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
