import { Component } from '@angular/core';
import { ListIconComponent } from '../../common/list-icon/list-icon.component';
import { CardModel } from '../../common/list-common/list-common.model';

@Component({
    selector: 'app-statistic-people',
    templateUrl: 'people.html'
})
export class StatisticPeopleComponent extends ListIconComponent {
    getNumber($card: CardModel) {
        return [(<any>$card).socials[0].like, (<any>$card).socials[0].follow];
    }
}
