import { Component } from '@angular/core';
import { ListCommonComponent } from '../list-common/list-common.component';
import { CardModel } from '../list-common/list-common.model';

@Component({
    selector: 'app-list-link',
    templateUrl: 'list-link.html',
    styleUrls: ['list-link.scss']
})

export class ListLinkComponent extends ListCommonComponent {
    title = {
        title: 'Danh sách dường dẫn',
        url: '/'
    } as CardModel;
}
