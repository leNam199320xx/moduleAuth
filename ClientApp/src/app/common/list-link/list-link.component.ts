import { Component, Input } from '@angular/core';
import { ListItemModel } from '../common-list.model';

@Component({
    selector: 'app-list-link',
    templateUrl: 'list-link.html',
    styleUrls: ['list-link.css']
})

export class ListLinkComponent {
    @Input() listLink: ListItemModel[] = [];
    @Input() isVertial = false;
    constructor() {

    }
}
