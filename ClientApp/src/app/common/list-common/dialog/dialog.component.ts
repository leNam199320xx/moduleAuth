import { Component, Input } from '@angular/core';
import { CardModel } from '../list-common.model';

@Component({
    selector: 'app-list-dialog',
    templateUrl: 'dialog.html',
    styleUrls: ['dialog.scss']
})
export class ListDialogComponent {
    @Input() card: CardModel;
    @Input() isFullscreen = false;
    constructor() {
        console.log(this.card);
    }
    btnClose() {
        this.card.enabledDialog = false;
    }

    btnFullscreen() {
        this.isFullscreen = !this.isFullscreen;
        console.log(1);
    }
}
