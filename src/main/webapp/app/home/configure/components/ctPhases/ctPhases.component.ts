import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';

@Component({
    templateUrl: './ctPhases.component.html',
    styleUrls: ['./ctPhases.component.scss'],
    selector: 'jhi-configure-ctPhase',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Ctphases {
    @Input() configures: Array<any> = [];

    constructor() {}

    handleAddConfiguration() {}
}
