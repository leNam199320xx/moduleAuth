import { Component, Input } from '@angular/core';
import { CardModel } from '../../common/list-common/list-common.model';
import { ListCommonComponent } from '../../common/list-common/list-common.component';

@Component({
    selector: 'app-statistic-people',
    templateUrl: 'people.html'
})
export class StatisticPeopleComponent extends ListCommonComponent {
    activatedAction = '';
    @Input() name: string;
    @Input() type: string;
    constructor() {
        super();
        this.setConfig();
    }
    getNumber($card: CardModel) {
        return [(<any>$card).socials[0].like, (<any>$card).socials[0].follow, (<any>$card).socials[0].view, (<any>$card).socials[0].share];
    }
    btnFilter($social: string, $action: string) {
        this.activatedAction = $action;
    }
}
