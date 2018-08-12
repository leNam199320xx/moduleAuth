import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-scroll',
    styleUrls: ['scroll.scss'],
    templateUrl: 'scroll.html'
})
export class ScrollComponent {
    @Input() maxSize = 0;
    @Input() size = 0;
    @Input() isHorizontal = true; // is scroll ||

    startPosition = 0;
    currentPosition = 0;
    distance = 0;

    down($event: MouseEvent | PointerEvent) {
        this.startPosition = (this.isHorizontal) ? $event.clientY : $event.clientX;
    }
    move($event: MouseEvent | PointerEvent) {
        this.setDistance($event);
    }
    up($event: MouseEvent | PointerEvent) {
        this.setDistance($event);
    }

    setDistance($event: MouseEvent | PointerEvent) {
        this.currentPosition = (this.isHorizontal) ? $event.clientY : $event.clientX;
        this.distance = this.currentPosition - this.startPosition;
        console.log(this.distance);
    }
}
