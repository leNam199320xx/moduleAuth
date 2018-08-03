import { Component, Input, OnInit } from '@angular/core';
import { ConfigLayoutComponent } from '../../config-layout.component';

@Component({
    selector: 'app-list-extend-panel',
    templateUrl: 'extend-panel.html'
})
export class ListExtendPanelComponent extends ConfigLayoutComponent implements OnInit {
    heightClsFixed: string;
    widthClsFixed: string;
    ngOnInit() {
        this.heightClsFixed = this.heightCls;
        this.widthClsFixed = this.widthCls;
    }
    btnFullscreen() {
        this.isFullscreen = !this.isFullscreen;
        if (this.isFullscreen) {
            this.heightCls = 'h-full';
            this.widthCls = 'w-full';
        } else {
            this.heightCls = this.heightClsFixed;
            this.widthCls = this.widthClsFixed;
        }
    }
}
