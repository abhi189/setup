import { Component, Input, Output, OnInit, OnChanges, EventEmitter, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';

@Component({
    templateUrl: './add-equipment.component.html',
    styleUrls: ['./add-equipment.component.scss'],
    selector: 'jhi-location-add-equipment'
})
export class AddEquipment implements OnChanges, OnInit {
    @Input() controllers: Array<any>;
    @Input() loading: boolean;
    @Input() showError: any;
    @Input() showErrorDetail: any;
    @Input() creatingEquipment: boolean;
    @Input() showConfirmModal: any = {};
    @Input() controllerSelected: any = {};
    @Output() onItemSelected = new EventEmitter();
    @Output() onConfirmClick = new EventEmitter();
    public loadingControllers: boolean;
    public showConfirmAdd: boolean;
    public showCancel: boolean;
    public equipment: any;
    public selectedController: any;
    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        const { controllers, controllerSelected, showConfirmModal, creatingEquipment, showError } = changes;

        if (controllers && controllers.currentValue !== controllers.previousValue) {
            this.controllers = controllers.currentValue;
        }

        if (controllerSelected && controllerSelected.currentValue !== controllerSelected.previousValue) {
            this.controllerSelected = controllerSelected.currentValue;
        }

        if (showConfirmModal && showConfirmModal.currentValue !== showConfirmModal.previousValue) {
            this.showConfirmAdd = showConfirmModal.currentValue ? showConfirmModal.currentValue.enable : false;
            this.showCancel = showConfirmModal.currentValue ? showConfirmModal.currentValue.showCancel : false;
            this.equipment = showConfirmModal.currentValue ? showConfirmModal.currentValue.equipment : null;
        }

        if (creatingEquipment && creatingEquipment.currentValue !== creatingEquipment.previousValue) {
            this.creatingEquipment = creatingEquipment.currentValue;
        }
    }

    ngOnInit() {
        this.selectedController = undefined;
    }

    continueAdd() {
        this.onConfirmClick.next(true);
        this.showConfirmAdd = false;
    }

    cancelAdd() {
        this.showConfirmAdd = false;
        this.onConfirmClick.next(false);
    }

    setSelectedController(controller: any) {
        this.selectedController = controller;
        this.onItemSelected.next({ name: 'equipment', value: this.selectedController });
    }
}
