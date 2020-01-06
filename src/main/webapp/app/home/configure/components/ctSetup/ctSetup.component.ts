import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';

@Component({
    templateUrl: './ctSetup.component.html',
    styleUrls: ['./ctSetup.component.scss'],
    selector: 'jhi-configure-ctSetup',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CtSetup {
    @Input() ctSetup: Array<any>;
    @Input() ctSetupSelected: any = {};
    @Input() loading: boolean;
    @Input() showError: boolean;
    @Output() onItemSelected = new EventEmitter();

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        const { ctSetups, ctSetupSelected } = changes;

        if (ctSetups && ctSetups.currentValue !== ctSetups.previousValue) {
            this.ctSetup = ctSetups.currentValue;
        }

        if (ctSetupSelected && ctSetupSelected.currentValue !== ctSetupSelected.previousValue) {
            this.ctSetupSelected = ctSetupSelected.currentValue;
        }
    }

    setSelectedctSetup(ctSetup: any) {
        this.onItemSelected.next({ name: 'ctSetup', value: ctSetup });
    }
}
