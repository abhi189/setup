import { IMAGE_URL } from './../../../../app.constants';
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
    @Output() onDeviceComponentLoaded = new EventEmitter();
    @Input() deletingDevice: boolean;
    @Input() showDeviceDeleteError: boolean;
    @Input() hideConfirmDelete: boolean;
    @Input() deviceError: string;
    @Input() deviceErrorDetail: string;
    @Output() onItemSelected = new EventEmitter();
    @Output() onAddEqupmentClicked = new EventEmitter();
    @Output() onDeleteDeviceClick = new EventEmitter();
    public imageUrl: string = IMAGE_URL;
    public selectedDevice: any = {};
    public showConfirmDelete: boolean = this.hideConfirmDelete;

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        const { devices, deviceSelected, hideConfirmDelete } = changes;

        if (devices && devices.currentValue !== devices.previousValue) {
            this.devices = devices.currentValue;
        }

        if (hideConfirmDelete && hideConfirmDelete.currentValue !== hideConfirmDelete.previousValue) {
            this.hideConfirmDelete = hideConfirmDelete.currentValue;
            this.showConfirmDelete = !this.hideConfirmDelete;
        }

        if (deviceSelected && deviceSelected.currentValue !== deviceSelected.previousValue) {
            this.deviceSelected = deviceSelected.currentValue;
        }
    }

    ngOnInit() {
        this.selectedDevice = {};
        this.onDeviceComponentLoaded.next();
    }

    setSelectedDevice(device: any) {
        this.onItemSelected.next({ name: 'device', value: device });
    }

    handleAddEquipment(event) {
        this.onAddEqupmentClicked.next(event);
    }

    deleteDevice(event, device) {
        this.selectedDevice = device;
        if (this.selectedDevice.name) {
            this.onDeleteDeviceClick.next(this.selectedDevice);
        }
        event.stopPropagation();
    }
}
