import { Component, Input, Output, OnChanges, EventEmitter, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';

@Component({
    templateUrl: './controller.component.html',
    styleUrls: ['./controller.component.scss'],
    selector: 'jhi-location-controller',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Controllers implements OnChanges {
    @Input() controllers: Array<any>;
    @Input() controllerSelected: any = {};
    @Output() onItemSelected = new EventEmitter();

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        const { controllers, controllerSelected } = changes;

        if (controllers && controllers.currentValue !== controllers.previousValue) {
            this.controllers = controllers.currentValue;
        }

        if (controllerSelected && controllerSelected.currentValue !== controllerSelected.previousValue) {
            this.controllerSelected = controllerSelected.currentValue;
        }
    }

    setSelectedController(controller: any) {
        this.onItemSelected.next({ name: 'controller', value: controller });
    }
}
