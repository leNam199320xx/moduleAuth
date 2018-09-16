import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { StatisticsService } from '../statistics.service';

@Component({
    selector: 'app-statistics-graph',
    templateUrl: 'graph.html'
})
export class StatisticsGraphComponent implements AfterViewInit {
    @ViewChild('svg') svgContainer: ElementRef;
    svg: SVGElement;
    circles: CircleModel[] = [{
        x: 10, y: 10, cls: '', r: 10
    }];
    constructor(private statisticsService: StatisticsService) { }

    ngAfterViewInit() {
        this.svg = this.svgContainer.nativeElement;
        this.svg.setAttribute('viewBox', '0 0 800 600');
        this.svg.setAttribute('width', '800');
        this.svg.setAttribute('height', '600');
        this.svg.classList.add('center');
        this.svg.classList.add('block');
        const circlesHtml = this.createListCircles();
        circlesHtml.forEach(item => {
            this.svg.appendChild(item);
        });
    }

    createCircle(cir: CircleModel) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('r', cir.x.toString());
        circle.setAttribute('cx', cir.y.toString());
        circle.setAttribute('cy', cir.r.toString());
        circle.setAttribute('fill', 'red');
        circle.setAttribute('stroke', 'black');
        circle.setAttribute('stroke-width', '2');
        circle.setAttribute('class', cir.cls);
        console.log(circle);
        return circle;
    }

    createListCircles() {
        const circlesSvg: SVGCircleElement[] = [];
        this.circles.forEach(item => {
            circlesSvg.push(this.createCircle(item));
        });
        return circlesSvg;
    }
}

export class CircleModel {
    x: number;
    y: number;
    r = 10;
    cls: string;
}
