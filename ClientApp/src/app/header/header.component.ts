import { Component } from '@angular/core';
import { ConfigsService } from '../core/configs.service';

@Component({
    selector: 'app-header',
    templateUrl: 'header.html'
})
export class HeaderComponent {
    constructor(public configsService: ConfigsService) {

    }
}
