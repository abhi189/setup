import { Component, Input, Output, OnChanges, EventEmitter, SimpleChanges, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
    templateUrl: './fc.component.html',
    styleUrls: ['./fc.component.scss'],
    selector: 'jhi-location-fc',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Fcs implements OnInit {
    @Input() fcs: Array<any>;
    public fcSelected: any = {};
    @Output() onItemSelected = new EventEmitter();
    @Output() setMacAddress = new EventEmitter<string>();
    macAddress: string;
    public id: string;

    constructor() {
        // const data = {
        //     macAddress: this.fcSelected.macAddress
        // }
    }

    // handleMacAddressChange(macAddress: string) {
    //     this.setMacAddress.emit(macAddress);
    // }

    ngOnInit() {}

    keyDownMac(macAddress) {
        this.setMacAddress.emit(macAddress);
    }

    // onChangeMacAddress (macAddress: string) {
    //     this.fcSelected.macAddress = macAddress;
    // }
}
