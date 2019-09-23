import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';

@Component({
    templateUrl: './configure.component.html',
    styleUrls: ['./configure.component.scss'],
    selector: 'jhi-location-configure',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigurationComponent {
    @Input() configures: Array<any> = [];

    constructor() {}

    hanldeAddConfiguration() {}
}
