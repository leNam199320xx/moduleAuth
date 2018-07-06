import { Component } from '@angular/core';
import { Post } from '../../core/db.model';

@Component({
    selector: 'app-list-post',
    templateUrl: 'list-post.html'
})
export class ListPostComponent {
    posts: Post[] = [];
}
