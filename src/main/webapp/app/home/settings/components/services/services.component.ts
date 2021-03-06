import { Component, Input, Output, OnChanges, EventEmitter, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';

@Component({
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.scss'],
    selector: 'jhi-location-services',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Services implements OnChanges {
    @Input() services: Array<any>;
    @Input() serviceSelected: any = {};
    @Output() onItemSelected = new EventEmitter();

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        const { services, serviceSelected } = changes;

        if (services && services.currentValue !== services.previousValue) {
            this.services = services.currentValue;
        }

        if (serviceSelected && serviceSelected.currentValue !== serviceSelected.previousValue) {
            this.serviceSelected = serviceSelected.currentValue;
        }
    }

    setSelectedService(service: any) {
        this.onItemSelected.next({ name: 'service', value: service });
    }
}
