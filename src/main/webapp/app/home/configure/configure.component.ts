import { Component, OnInit } from '@angular/core';

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

    constructor() {}

    ngOnInit(): void {
        this.currentScreen = 'location';
        this.showNextButton = true;
    }

    getNextStep() {}

    handleItemSelected(store: any) {
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
        if (this.validateFormData()) {
            this.isNextEnabled = true;
        } else {
            this.isNextEnabled = false;
        }
    }

    validateFormData() {
        switch (this.currentScreen) {
            case 'location': {
                if (this.formData['store']) return true;
            }
            case 'service': {
            }
            default:
                return true;
        }
    }

    handlePreviousClick() {}

    handleNextClick() {}
}
