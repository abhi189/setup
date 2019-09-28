import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';

@Component({
    templateUrl: './ctSetup.component.html',
    styleUrls: ['./ctSetup.component.scss'],
    selector: 'jhi-configure-ctSetup',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Ctsetup {
    @Input() configures: Array<any> = [];

    constructor() {}

    handleAddConfiguration() {}
}
