import { Component, Input, OnInit, Inject } from '@angular/core';
import { CardModel } from './list-common.model';
import { PageModel } from '../paging/page.model';
import { ConfigLayoutComponent } from '../config-layout.component';

@Component(
    {
        selector: 'app-list-common',
        templateUrl: 'list-common.html'
    }
)
export class ListCommonComponent extends ConfigLayoutComponent implements OnInit  {
    @Input() cards: CardModel[] = [];
    @Input() pageSize = 8;
    @Input() currentPage = 1;
    @Input() hasPaging = true;
    @Input() title: CardModel;
    displayCards: CardModel[] = [];
    pageConfig: PageModel;
    ngOnInit() {
        this.pageConfig = new PageModel(this.cards.length, this.pageSize, this.currentPage);
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

    openExtendPanelOrDialog(card: CardModel) {
        card.enabledDialog = true;
    }
}
