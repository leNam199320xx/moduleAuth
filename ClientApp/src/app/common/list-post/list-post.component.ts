import { Component } from '@angular/core';
import { ListCardComponent } from '../list-card/list-card.component';
import { MatDialog } from '../../../../node_modules/@angular/material';

@Component({
    selector: 'app-list-post',
    templateUrl: 'list-post.html',
    styleUrls: ['list-post.scss']
})
export class ListPostComponent extends ListCardComponent {
    constructor(_dialog: MatDialog) {
        super();
        this.dialog = _dialog;
    }
}
