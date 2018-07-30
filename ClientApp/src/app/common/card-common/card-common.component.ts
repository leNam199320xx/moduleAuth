import { Component, Input } from '@angular/core';
import { CardModel } from '../list-common/list-common.model';

@Component({
    selector: 'app-card-common',
    templateUrl: 'card-common.html',
    styleUrls: ['card-common.scss']
})
export class CardCommonComponent {
    @Input() card: CardModel;
    @Input() isFullscreen = false;

    btnClose() { }
}
