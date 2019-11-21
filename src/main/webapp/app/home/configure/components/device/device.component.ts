import { Component, Input, Output, OnChanges, EventEmitter, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';

@Component({
    templateUrl: './device.component.html',
    styleUrls: ['./device.component.scss'],
    selector: 'jhi-configure-devices',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Devices implements OnChanges {
    @Input() devices: Array<any>;
    @Input() deviceSelected: any = {};
    @Output() onItemSelected = new EventEmitter();

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        const { devices, deviceSelected } = changes;

        if (devices && devices.currentValue !== devices.previousValue) {
            this.devices = devices.currentValue;
        }

        if (deviceSelected && deviceSelected.currentValue !== deviceSelected.previousValue) {
            this.deviceSelected = deviceSelected.currentValue;
        }
    }

    setSelectedDevice(device: any) {
        this.onItemSelected.next({ name: 'device', value: device });
    }
}
