import { Component, Input, Output, EventEmitter, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';

@Component({
    templateUrl: './connection.component.html',
    styleUrls: ['./connection.component.scss'],
    selector: 'jhi-location-connections',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Connections {
    @Input() connections: Array<any>;
    @Input() connectionSelected: any = {};
    @Output() onItemSelected = new EventEmitter();

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        const { connections, connectionSelected } = changes;

        if (connections && connections.currentValue !== connections.previousValue) {
            this.connections = connections.currentValue;
        }

        if (connectionSelected && connectionSelected.currentValue !== connectionSelected.previousValue) {
            this.connectionSelected = connectionSelected.currentValue;
        }
    }

    setSelectedConnection(connection: any) {
        this.onItemSelected.next({ name: 'connection', value: connection });
    }
}
