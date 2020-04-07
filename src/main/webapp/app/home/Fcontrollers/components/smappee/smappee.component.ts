import { Component, Input, Output, OnInit, OnChanges, EventEmitter, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';

@Component({
    templateUrl: './smappee.component.html',
    styleUrls: ['./smappee.component.scss'],
    selector: 'jhi-location-smappee'
})
export class Smappee implements OnChanges {
    @Input() controllers: Array<any>;
    @Input() loading: boolean;
    @Input() FcError: string;
    @Input() FcErrorDetail: string;
    @Input() controllerSelected: any = {};
    @Output() onItemSelected = new EventEmitter();
    public loadingControllers: boolean;

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
        this.onItemSelected.next({ name: 'smappeeController', value: controller });
    }
}
