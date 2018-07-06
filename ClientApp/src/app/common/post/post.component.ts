import { Component } from '@angular/core';
import { Post } from '../../core/db.model';

@Component({
    selector: 'app-post',
    templateUrl: 'post.html'
})
export class PostComponent {
    public post: Post;
}
