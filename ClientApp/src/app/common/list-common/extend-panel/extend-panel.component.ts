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
}
