import { Component, Input, Output, OnChanges, EventEmitter, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';

@Component({
    templateUrl: './ctPhases.component.html',
    styleUrls: ['./ctPhases.component.scss'],
    selector: 'jhi-configure-ctPhase',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CtPhase implements OnChanges {
    @Input() ctPhase: Array<any>;
    @Input() ctPhaseSelected: any = {};
    @Input() loading: boolean;
    @Input() showError: boolean;
    @Output() onItemSelected = new EventEmitter();

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        const { ctPhases, ctPhaseSelected } = changes;

        if (ctPhases && ctPhases.currentValue !== ctPhases.previousValue) {
            this.ctPhase = ctPhases.currentValue;
        }

        if (ctPhaseSelected && ctPhaseSelected.currentValue !== ctPhaseSelected.previousValue) {
            this.ctPhaseSelected = ctPhaseSelected.currentValue;
        }
    }

    setSelectedctPhase(ctPhase: any) {
        this.onItemSelected.next({ name: 'ctPhase', value: ctPhase });
    }
}
