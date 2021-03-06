import { Component } from '@angular/core';
import { MessageModel, MessageType } from '../shared/message-dialog/message.model';
import { CardModel } from '../common/list-common/list-common.model';
import { StatisticsService } from './statistics.service';
import { Career, StatisticCardModel, Social } from '../core/statistics.model';
import { ReplaySubject, BehaviorSubject, Subject } from 'rxjs';
import { map, take } from 'rxjs/Operators';
import { ResponseModel } from '../core/response.model';

@Component({
    selector: 'app-statistics',
    templateUrl: 'statistics.html'
})
export class StatisticsComponent {
    errorMessage: MessageModel;
    errorMessageOld: MessageModel;
    cards: CardModel[] = [];
    socials: Social[] = this.statisticsService.socials;
    displayData: StatisticCardModel[] = [];
    socialSelected: Social = new Social();
    datafull: StatisticCardModel[] = [];
    // dataSub: Subject<StatisticCardModel[]> = new Subject();
    constructor(private statisticsService: StatisticsService) {
        for (let i = 0; i < 20; i++) {
            const card = {
                url: '/',
                title: 'Máy ảnh canon',
                imagesUrl: '/assets/images/canon200x200.jpg'
            } as CardModel;
            card.title += ' - ' + i;
            this.cards.push(card);
        }
        this.statisticsService.getSocialsWithPeoples().subscribe(rs => {
            const so = rs as Social[];
            this.statisticsService.socials = so || [];
            this.socials = this.statisticsService.socials;
            this.socials.forEach(data => {
                data.careersMap = this.mapData(data.careers);
                console.log(this.displayData);
            });
        });
    }
    mapData(careers: Career[]) {
        const _mapData: StatisticCardModel[] = [];
        for (let i = 0; i < careers.length; i++) {
            const _one = careers[i];
            const dataCards: CardModel[] = [];
            const data = new StatisticCardModel();
            _one.peoples.forEach(_p => {
                const _c = new CardModel();
                _c.title = '<span>' + _p.fullName + ' (<b>' + _p.shortName + '</b>)' + '</span>';
                _c.url = '/graph/' + _p.id;
                _c.imagesUrl = _p.imagesUrl;
                _c.avatar = _p.avatar;
                _c.message = _p.message ? '<i class="fs-sm">' + _p.message + '</i>' : '';
                (<any>_c).socials = _p.socials;

                dataCards.push(_c);
            });
            data.name = 'TOP ' + _one.name;
            data.data = dataCards;
            _mapData.push(data);
        }
        return _mapData;
    }
    closeMessageDialog() {
        this.errorMessageOld = this.errorMessage;
        this.errorMessage = undefined;
    }

    socialBtn($social: Social) {
        if ($social.id === this.socialSelected.id) {
            $social._activated = false;
            this.socialSelected = new Social();
        } else {
            this.socials.forEach(rs => {
                rs._activated = false;
            });
            $social._activated = true;
            this.socialSelected = $social;
        }
    }

    checkSocial($social: Social) {
        if ((this.socialSelected.id === $social.id) || (this.socialSelected.id === 0)) {
            return true;
        }
        return false;
    }
}
