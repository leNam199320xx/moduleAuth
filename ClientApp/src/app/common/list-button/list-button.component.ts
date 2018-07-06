import { Component, Input } from '@angular/core';
import { GeneralConfigModel } from '../../core/config.model';

@Component({
    selector: 'app-list-button',
    templateUrl: 'list-button.html'
})
export class ListButtonComponent {
    @Input() configs: GeneralConfigModel;
}
