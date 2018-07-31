import { Input, Component } from '@angular/core';

@Component({
    selector: 'app-size-common',
    template: ''
})
export class SizeCommonComponent {
    @Input() widthCls: string;
    @Input() heightCls: string;
}
