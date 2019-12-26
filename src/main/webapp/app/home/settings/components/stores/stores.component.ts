import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges, ChangeDetectionStrategy, OnChanges } from '@angular/core';

@Component({
    templateUrl: './stores.component.html',
    styleUrls: ['./stores.component.scss'],
    selector: 'jhi-location-stores',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Stores implements OnInit, OnChanges {
    @Input() stores: Array<any>;
    @Input() storeSelected: any = {};
    @Input() loading: boolean;
    @Output() onItemSelected = new EventEmitter();
    @Output()  onRefreshStores = new EventEmitter();

    constructor() {
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { stores, storeSelected } = changes;

        if (stores && stores.currentValue !== stores.previousValue) {
            this.stores = stores.currentValue;
        }

        if (storeSelected && storeSelected.currentValue !== storeSelected.previousValue) {
            this.storeSelected = storeSelected.currentValue;
        }
    }

    setSelectedStore(store: any) {
        this.onItemSelected.next({ name: 'store', value: store });
    }

    refreshStores() {
        this.onRefreshStores.next();
    }
}
