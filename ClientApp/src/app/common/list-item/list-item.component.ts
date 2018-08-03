import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CardModel } from '../list-common/list-common.model';

@Component({
    selector: 'app-list-item',
    templateUrl: 'list-item.html'
})

export class ListItemComponent {
    @Input() card: CardModel;
    @Output() openEvent: EventEmitter<CardModel> = new EventEmitter();
    openExtendPanelOrDialog() {
        this.openEvent.emit(this.card);
    }
}
