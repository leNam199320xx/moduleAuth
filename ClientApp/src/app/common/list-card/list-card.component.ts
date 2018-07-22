import { Component, Input } from '@angular/core';
import { CardModel } from './list-card.model';
import { PageModel } from '../paging/page.model';

@Component(
    {
        selector: 'app-list-card',
        templateUrl: 'list-card.html',
        styleUrls: ['list-card.css']
    }
)
export class ListCardComponent {
    @Input() cards: CardModel[] = [];
    pageConfig: PageModel;

    constructor() {
        this.pageConfig = new PageModel(this.cards.length, 8, 0);
    }
}
