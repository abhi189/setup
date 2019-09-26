import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';

@Component({
    templateUrl: './device.component.html',
    styleUrls: ['./device.component.scss'],
    selector: 'jhi-configure-devices',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Devices {
    @Input() configures: Array<any> = [];

    constructor() {}

    hanldeAddConfiguration() {}
}
