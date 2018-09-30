import { Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CardModel } from './list-common.model';
import { PageModel } from '../paging/page.model';
import { ConfigLayoutComponent } from '../config-layout.component';
import { PagingComponent } from '../paging/paging.component';

export abstract class ListCommonComponent extends ConfigLayoutComponent implements OnInit {
    @Input() cards: CardModel[] = [];
    @Input() pageSize = 8;
    @Input() currentPage = 1;
    @Input() hasPaging = true;
    @Input() isLoadMore = false;
    @Input() title: CardModel;
    @Output() quickNextEvent: EventEmitter<any> = new EventEmitter();
    @Output() quickBackEvent: EventEmitter<any> = new EventEmitter();
    @Output() quickGotoEvent: EventEmitter<any> = new EventEmitter();
    displayCards: CardModel[] = [];
    pageConfig: PageModel;
    ngOnInit() {
        this.setConfig();
    }
    setConfig() {
        this.pageConfig = new PageModel(this.cards.length, this.pageSize, this.currentPage);
        this.pageConfig.loadMore = this.isLoadMore;
        this.getCards();
    }

    next($data: PagingComponent) {
        this.pageConfig = $data.page;
        this.getCards();
    }

    loadMore($data: PagingComponent) {
        this.pageConfig = $data.page;
        this.getCards();
    }

    back($data: PagingComponent) {
        this.pageConfig = $data.page;
        this.getCards();
    }

    goto($data: PagingComponent) {
        this.pageConfig = $data.page;
        this.getCards();
    }

    getCards() {
        const results = this.cards.slice(this.pageConfig.pageIndex * this.pageConfig.pageSize,
            (this.pageConfig.pageIndex + 1) * this.pageConfig.pageSize);
        this.displayCards = (!this.isLoadMore)
            ? results : (this.displayCards.length < this.cards.length)
                ? this.displayCards.concat(results) : this.displayCards;
    }

    openExtendPanelOrDialog(card: CardModel) {
        card.enabledDialog = true;
    }
}
