import { Component, Input, Output, EventEmitter, OnInit, OnChanges, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';

@Component({
    templateUrl: './ctTypes.component.html',
    styleUrls: ['./ctTypes.component.scss'],
    selector: 'jhi-configure-ctTypes',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Cttypes implements OnInit, OnChanges {
    @Input() ctTypes: Array<any>;
    @Input() ctTypeSelected: any = {};
    @Input() loading: boolean;
    @Input() showError: string;
    @Input() showErrorDetail: string;
    @Output() onItemSelected = new EventEmitter();

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        const { ctTypes, ctTypeSelected } = changes;

        if (ctTypes && ctTypes.currentValue !== ctTypes.previousValue) {
            this.ctTypes = ctTypes.currentValue;
        }

        if (ctTypeSelected && ctTypeSelected.currentValue !== ctTypeSelected.previousValue) {
            this.ctTypeSelected = ctTypeSelected.currentValue;
        }
    }

    ngOnInit() {
        //  this.onCtTypeMount.next();
    }

    setSelectedCtType(ctType: any) {
        this.onItemSelected.next({ name: 'ctType', value: ctType });
    }
}
