import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';

@Component({
    templateUrl: './ctTypes.component.html',
    styleUrls: ['./ctTypes.component.scss'],
    selector: 'jhi-configure-ctTypes',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Cttypes {
    @Input() configures: Array<any> = [];

    constructor() {}

    hanldeAddConfiguration() {}
}
