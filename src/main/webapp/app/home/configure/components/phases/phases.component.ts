import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';

@Component({
    templateUrl: './phases.component.html',
    styleUrls: ['./phases.component.scss'],
    selector: 'jhi-configure-phases',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Phases {
    @Input() configures: Array<any> = [];

    constructor() {}
}
