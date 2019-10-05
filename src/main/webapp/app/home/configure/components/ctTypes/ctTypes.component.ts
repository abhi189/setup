import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';

@Component({
    templateUrl: './ctTypes.component.html',
    styleUrls: ['./ctTypes.component.scss'],
    selector: 'jhi-configure-ctTypes',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Cttypes {
    @Input() ctType: Array<any>;
    @Input() ctTypeSelected: any = {};
    @Output() onItemSelected = new EventEmitter();

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        const { ctTypes, ctTypeSelected } = changes;

        if (ctTypes && ctTypes.currentValue !== ctTypes.previousValue) {
            this.ctType = ctTypes.currentValue;
        }

        if (ctTypeSelected && ctTypeSelected.currentValue !== ctTypeSelected.previousValue) {
            this.ctTypeSelected = ctTypeSelected.currentValue;
        }
    }

    setSelectedCttypes(ctType: any) {
        this.onItemSelected.next({ name: 'ctType', value: ctType });
    }
}
