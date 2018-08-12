import { Component, Input, OnInit } from '@angular/core';
import { ListCommonComponent } from '../list-common/list-common.component';

@Component({
    selector: 'app-list-icon',
    templateUrl: 'list-icon.html'
})

export class ListIconComponent extends ListCommonComponent implements OnInit {
    @Input() name = 'My list';
    ngOnInit() {
        console.log('icon config');
        this.setConfig();
    }
}
