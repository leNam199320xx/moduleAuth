import { Component, Input } from '@angular/core';
import { CardModel } from '../list-common.model';

@Component({
    selector: 'app-list-dialog',
    templateUrl: 'dialog.html',
    styleUrls: ['dialog.scss']
})
export class ListDialogComponent {
    @Input() card: CardModel;
    constructor() {
        console.log(this.card);
    }
    btnClose() {
        this.card.enabledDialog = false;
    }
}
