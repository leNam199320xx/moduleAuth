import { Component, Input } from '@angular/core';
import { ConfigLayoutComponent } from '../../config-layout.component';

@Component({
    selector: 'app-list-dialog',
    templateUrl: 'dialog.html'
})
export class ListDialogComponent extends ConfigLayoutComponent {
    constructor() {
        super();
    }
}
