import { Component, Input, OnInit } from '@angular/core';
import { CardModel } from './list-card.model';
import { PageModel } from '../paging/page.model';
import { ListCommonComponent } from '../list-common/list-common.component';

@Component(
    {
        selector: 'app-list-card',
        templateUrl: 'list-card.html',
        styleUrls: ['list-card.css']
    }
)
export class ListCardComponent extends ListCommonComponent {
    constructor() {
        super();
    }
}
