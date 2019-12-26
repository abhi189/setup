import { Component, Input, Output, OnChanges, EventEmitter, SimpleChanges, ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
    templateUrl: './device.component.html',
    styleUrls: ['./device.component.scss'],
    selector: 'jhi-configure-devices',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Devices implements OnChanges, OnInit {
    @Input() devices: Array<any> = [];
    @Input() deviceSelected: any = {};
    @Input() loading: boolean;
    @Output() onItemSelected = new EventEmitter();
    @Output() onAddEqupmentClicked = new EventEmitter();
    @Output() onDeviceComponentLoaded = new EventEmitter();

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

    ngOnInit() {
        this.onDeviceComponentLoaded.next();
    }

    setSelectedDevice(device: any) {
        this.onItemSelected.next({ name: 'device', value: device });
    }

    handleAddEquipment(event) {
        this.onAddEqupmentClicked.next(event);
    }

}
