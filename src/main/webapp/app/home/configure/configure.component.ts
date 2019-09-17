import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../core/login/login.service';

@Component({
    selector: 'jhi-configure',
    templateUrl: './configure.component.html',
    styleUrls: ['./configure.component.scss']
})
export class ConfigureComponent implements OnInit {
    public showNextButton: boolean;
    public currentScreen: string;
    public showPreviousButton: boolean;
    public isNextEnabled: boolean;
    public isPreviousEnabled: boolean;
    public formData: any = {};
    public storeSelected: any = {};

    public data = {
        stores: [
            {
                id: 1,
                address: 'address field for 1',
                city: 'illinois',
                online: false
            },
            {
                id: 2,
                address: 'address field for 2',
                city: 'sample2',
                online: true
            },
            {
                id: 3,
                address: 'address field for 3',
                city: 'sample2',
                online: true
            },
            {
                id: 4,
                address: 'address field for 4',
                city: 'sample3',
                online: false
            },
            {
                id: 1,
                address: 'address field for 1',
                city: 'illinois',
                online: false
            },
            {
                id: 2,
                address: 'address field for 2',
                city: 'sample2',
                online: true
            },
            {
                id: 3,
                address: 'address field for 3',
                city: 'sample2',
                online: true
            },
            {
                id: 4,
                address: 'address field for 4',
                city: 'sample3',
                online: false
            }
        ]
    };

    steps = {
        location: '',
        services: '',
        configure: ''
    };

    public allScreens: Array<string> = [];

    constructor(private loginService: LoginService) {}

    ngOnInit(): void {
        this.currentScreen = 'location';
        this.showNextButton = true;
        this.allScreens = Object.keys(this.steps);
    }

    getNextStep() {
        let currentScreenIndex = this.allScreens.indexOf(this.currentScreen);

        if (currentScreenIndex < this.allScreens.length - 1) {
            currentScreenIndex = currentScreenIndex + 1;
        }
        return this.allScreens[currentScreenIndex];
    }

    getPreviousStep() {
        let currentScreenIndex = this.allScreens.indexOf(this.currentScreen);

        if (currentScreenIndex > 0) {
            currentScreenIndex = currentScreenIndex - 1;
        }
        return this.allScreens[currentScreenIndex];
    }

    handleItemSelected(store) {
        this.storeSelected = store;
        this.updateForm({ store });
    }

    updateForm(data) {
        this.formData = {
            ...this.formData,
            ...data
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
                if (this.formData['store']) return true;
            }
            case 'services': {
                if (this.formData['services']) return true;
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
        console.log('Previous: ', this.currentScreen);
    }

    handleNextClick() {
        if (this.validateScreenData()) {
            this.currentScreen = this.getNextStep();
            this.isNextEnabled = false;
            if (this.allScreens.indexOf(this.currentScreen) === this.allScreens.length - 1) {
            }
            this.showPreviousButton = this.isPreviousEnabled = true;
        }
        console.log('Next: ', this.currentScreen);
    }

    handleLogout() {
        this.loginService.logout();
    }
}
