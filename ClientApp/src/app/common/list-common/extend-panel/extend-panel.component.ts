import { Component, Input } from '@angular/core';
import { CardModel } from '../list-common.model';
import { ListDialogComponent } from '../dialog/dialog.component';

@Component({
    selector: 'app-list-extend-panel',
    templateUrl: 'extend-panel.html',
    styleUrls: ['extend-panel.scss']
})
export class ListExtendPanelComponent extends ListDialogComponent {
    @Input() card: CardModel;

    btnFullscreen() {
        this.isFullscreen = !this.isFullscreen;
        if (this.isFullscreen) {
            this.heightCls = 'h-full';
            this.widthCls = 'w-full';
        } else {
            this.heightCls = 'h-600';
            this.widthCls = 'w-600';
        }
    }
}
