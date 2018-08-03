import { Input, Component } from '@angular/core';
import { CardModel } from './list-common/list-common.model';

@Component({
    selector: 'app-config-layout',
    template: ''
})
export class ConfigLayoutComponent {
    @Input() hasFullscreen = true;
    @Input() hasOrder = false;
    @Input() hasPay = false;
    @Input() isFullscreen = false;
    @Input() isProduct = false;
    @Input() card: CardModel;
    @Input() widthCls: string;
    @Input() heightCls: string;
    btnClose() {
        this.card.enabledDialog = false;
    }

    btnFullscreen() {
        this.isFullscreen = !this.isFullscreen;
    }
}
