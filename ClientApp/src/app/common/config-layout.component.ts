import { Input, Component } from '@angular/core';
import { SizeCommonComponent } from './size-common.component';

@Component({
    selector: 'app-config-layout',
    template: ''
})
export class ConfigLayoutComponent extends SizeCommonComponent {
    @Input() hasFullscreen = true;
}
