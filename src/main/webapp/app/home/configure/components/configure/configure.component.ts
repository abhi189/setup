import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';

@Component({
    templateUrl: './configure.component.html',
    styleUrls: ['./configure.component.scss'],
    selector: 'jhi-location-configure',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Configure {
    @Input() configures: Array<any> = [];

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        const { configures } = changes;

        if (configures && configures.currentValue !== configures.previousValue) {
            this.configures = configures.currentValue;
        }
    }

    hanldeAddConfiguration() {}
}
