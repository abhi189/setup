import { Component, Input, Output, OnChanges, EventEmitter, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';

@Component({
    templateUrl: './phases.component.html',
    styleUrls: ['./phases.component.scss'],
    selector: 'jhi-configure-phases',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Phases implements OnChanges {
    @Input() phases: Array<any>;
    @Input() phaseSelected: any = {};
    @Output() onItemSelected = new EventEmitter();

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        const { phases, phaseSelected } = changes;

        if (phases && phases.currentValue !== phases.previousValue) {
            this.phases = phases.currentValue;
        }

        if (phaseSelected && phaseSelected.currentValue !== phaseSelected.previousValue) {
            this.phaseSelected = phaseSelected.currentValue;
        }
    }

    setSelectedPhase(phase: any) {
        this.onItemSelected.next({ name: 'phase', value: phase });
    }
}

