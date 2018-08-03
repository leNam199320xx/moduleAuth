import { Component, Input } from '@angular/core';
import { GeneralConfigModel } from '../../core/config.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
    selector: 'app-list-button',
    templateUrl: 'list-button.html'
})
export class ListButtonComponent extends ListItemComponent {
    @Input() configs: GeneralConfigModel;
}
