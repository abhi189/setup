import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.scss'],
    selector: 'jhi-location-services'
})
export class Services {
    @Input() services: Array<any>;
    @Output() onItemSelected = new EventEmitter();

    constructor() {}
}
