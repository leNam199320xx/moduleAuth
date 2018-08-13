import { Component } from '@angular/core';
import { MessageModel, MessageType } from '../shared/message-dialog/message.model';
import { CardModel } from '../common/list-common/list-common.model';
import { StatisticsService } from './statistics.service';
import { Career, StatisticCardModel } from './statistics.model';
import { ReplaySubject, BehaviorSubject, Subject } from '../../../node_modules/rxjs';
import { map } from '../../../node_modules/rxjs/Operators';

@Component({
    selector: 'app-statistics',
    templateUrl: 'statistics.html'
})
export class StatisticsComponent {
    errorMessage: MessageModel;
    errorMessageOld: MessageModel;
    cards: CardModel[] = [];
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
        this.statisticsService.getDataStatistics().subscribe(rs => {
            const _mapData: StatisticCardModel[] = [];

            for (let i = 0; i < rs.length; i++) {
                const _one = rs[i];
                const dataCards: CardModel[] = [];
                const data = new StatisticCardModel();
                _one.data.forEach(_p => {
                    const _c = new CardModel();
                    _c.title = '<span class="bold">' + _p.full_name + ' (<b>' + _p.artist_name + '</b>)' + '</span>';
                    _c.url = _p.url;
                    _c.imagesUrl = _p.imageUrl;
                    let sc = '';
                    if (_p.socials) {
                        _p.socials.forEach(_sc => {
                            sc += '<div class="fs-sm"><p class="fs-nm">' + _sc.name
                                + '</p><div class="w-sm-2 iblock"> like: ' + _sc.like + '</div>'
                                + '<div class="w-sm-2 iblock"> follow: ' + _sc.follow + '</div></div>';
                        });
                    }
                    _c.message = '<i class="fs-sm">' + _p.message + '</i>'
                        + sc;
                    dataCards.push(_c);
                });
                data.name = 'TOP ' + _one.name;
                data.data = dataCards;
                _mapData.push(data);
            }
            this.datafull = _mapData;
        });
    }
    getSearchResults($val: string) {
        if ($val && $val !== '') {
            // search
        } else {
            // error message
            this.errorMessage = new MessageModel();
            this.errorMessage.key = 404;
            this.errorMessage.message = 'Not found';
            this.errorMessage.type = MessageType.error;
        }
    }

    closeMessageDialog() {
        this.errorMessageOld = this.errorMessage;
        this.errorMessage = undefined;
    }
}
