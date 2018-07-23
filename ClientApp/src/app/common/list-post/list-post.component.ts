import { Component } from '@angular/core';
import { Post } from '../../core/db.model';
import { ListCardComponent } from '../list-card/list-card.component';

@Component({
    selector: 'app-list-post',
    templateUrl: 'list-post.html',
    styleUrls: ['list-post.scss']
})
export class ListPostComponent extends ListCardComponent {
}
