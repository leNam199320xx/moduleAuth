import { Component, Input, OnInit } from '@angular/core';
import { CardModel } from './list-card.model';
import { PageModel } from '../paging/page.model';

@Component(
    {
        selector: 'app-list-card',
        templateUrl: 'list-card.html',
        styleUrls: ['list-card.css']
    }
)
export class ListCardComponent implements OnInit {
    @Input() cards: CardModel[] = [];
    displayCards: CardModel[] = [];
    pageConfig: PageModel;

    constructor() {
    }

    ngOnInit() {
        this.pageConfig = new PageModel(this.cards.length, 8, 0);
        this.getCards();
    }

    next($data: any) {
        this.pageConfig = $data.page;
        this.getCards();
    }

    back($data: any) {
        this.pageConfig = $data.page;
        this.getCards();
    }

    goto($data: any) {
        this.pageConfig = $data.page;
        this.getCards();
    }

    getCards() {
        this.displayCards = this.cards.slice(this.pageConfig.pageIndex * this.pageConfig.pageSize,
            (this.pageConfig.pageIndex + 1) * this.pageConfig.pageSize);
    }
}
