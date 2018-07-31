import { Component, Input } from '@angular/core';
import { CardModel } from '../list-common/list-common.model';
import { ConfigLayoutComponent } from '../config-layout.component';

@Component({
    selector: 'app-card-common',
    templateUrl: 'card-common.html',
    styleUrls: ['card-common.scss']
})
export class CardCommonComponent extends ConfigLayoutComponent {
    @Input() card: CardModel;
    @Input() isFullscreen = false;
    btnClose() { }
}
