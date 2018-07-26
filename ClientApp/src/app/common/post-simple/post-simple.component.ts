import { Component, OnInit } from '@angular/core';
import { Post } from '../../core/db.model';

@Component({
    selector: 'app-post-simple',
    templateUrl: 'post-simple.html',
    styleUrls: ['post-simple.scss']
})
export class PostSimpleComponent implements OnInit {
    mainPost: Post;
    subPosts: Post[] = [];
    ngOnInit() {

    }
}
