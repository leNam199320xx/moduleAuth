import { Component, Input } from '@angular/core';
import { CardModel } from '../list-common.model';
import { ConfigLayoutComponent } from '../../config-layout.component';

@Component({
    selector: 'app-list-dialog',
    templateUrl: 'dialog.html',
    styleUrls: ['dialog.scss']
})
export class ListDialogComponent extends ConfigLayoutComponent {
    @Input() card: CardModel;
    @Input() isFullscreen = false;
    constructor() {
        super();
    }
    btnClose() {
        this.card.enabledDialog = false;
    }

    btnFullscreen() {
        this.isFullscreen = !this.isFullscreen;
    }
}
