import { Component } from '@angular/core';
import { ListCommonComponent } from '../list-common/list-common.component';
import { ConfigsService } from '../../core/configs.service';

@Component(
    {
        selector: 'app-list-card',
        templateUrl: 'list-card.html'
    }
)
export class ListCardComponent extends ListCommonComponent {
    constructor(private configsService: ConfigsService) {
        super();
        this.widthCls = this.configsService.configs.site.clsWidth;
        this.configsService.configsSubject.subscribe(() => {
            this.widthCls = this.configsService.configs.site.clsWidth;
        });
    }
}
