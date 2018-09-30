import { Component, ViewChild, ElementRef, AfterViewInit, Input, OnInit } from '@angular/core';
import { StatisticsService } from '../statistics.service';
import { People, PeopleSocialsByDate, PeopleSocials } from '../../core/statistics.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-statistics-graph',
    templateUrl: 'graph.html'
})
export class StatisticsGraphComponent implements AfterViewInit, OnInit {
    @ViewChild('svg') svgContainer: ElementRef;
    @Input() peopleInfo: People;
    peopleId: number;
    svg: SVGElement;
    circles: CircleModel[] = [{
        x: 10, y: 10, cls: '', r: 10, stroke: 'black', strokeWidth: 2
    }];
    displayData: PeopleSocials[] = [];
    width = 800;
    height = 600;
    unitX = 0.5;
    unitY = 10000;
    x = 0;
    y = 0;
    ratio = 1;
    oldRatio = 1;
    viewBox: '0 0 800 600';
    lineX = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    lineY = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    constructor(private statisticsService: StatisticsService, private route: ActivatedRoute) {
        this.peopleInfo = this.statisticsService.peopleSelected;
    }

    ngOnInit() {
        this.peopleId = +this.route.snapshot.paramMap.get('peopleId');
        if (this.peopleId && this.peopleId > 0) {
            this.statisticsService.getAllSocialInfoByPeopleId(this.peopleId).subscribe(res => {

                this.displayData = res;
                this.displayData.forEach(data => {
                    this.mapDataAndCreateCircle(data);
                });
            });
        }
    }

    setUnitSize($size: number, $unit: number) {
        return $size / $unit;
    }

    ngAfterViewInit() {
        this.svg = this.svgContainer.nativeElement;
        this.svg.setAttribute('width', (this.width).toString());
        this.svg.setAttribute('height', (this.height).toString());
        this.svg.classList.add('center');
        this.svg.classList.add('block');
        this.settingSvg();

        const circlesHtml = this.createListCircles();
        circlesHtml.forEach(item => {
            this.svg.appendChild(item);
        });
        this.svg.appendChild(this.lineX);
        this.svg.appendChild(this.lineY);
    }

    settingSvg($x: number = null, $y: number = null) {
        const centerPoint = {
            x: -this.width * this.ratio / 2,
            y: -this.height * this.ratio / 2
        };
        this.x = $x ? $x : centerPoint.x;
        this.y = $y ? $y : centerPoint.y;
        this.svg.setAttribute('viewBox',
            (this.x) + ' '
            + (this.y) + ' '
            + (this.width * this.ratio) + ' '
            + (this.height * this.ratio));
        this.lineX.setAttribute('stroke', 'black');
        this.lineX.setAttribute('stroke-width', (this.ratio / 2).toString());
        this.lineY.setAttribute('stroke', 'black');
        this.lineY.setAttribute('stroke-width', (this.ratio / 2).toString());
        const lx1 = this.x;
        const lx2 = this.width * this.ratio + this.x;
        const ly1 = this.y;
        const ly2 = this.height * this.ratio + this.y;
        this.lineX.setAttribute('x1', lx1.toString());
        this.lineX.setAttribute('x2', lx2.toString());

        this.lineX.setAttribute('y1', '0');
        this.lineX.setAttribute('y2', '0');

        this.lineY.setAttribute('x1', '0');
        this.lineY.setAttribute('x2', '0');

        this.lineY.setAttribute('y1', ly1.toString());
        this.lineY.setAttribute('y2', ly2.toString());
    }

    btnSvgZoomIn() {
        this.oldRatio = this.ratio;
        this.ratio = this.ratio * 0.75;
        this.x -= (this.ratio - this.oldRatio) * this.width / 2;
        this.y -= (this.ratio - this.oldRatio) * this.height / 2;
        this.settingSvg(this.x, this.y);
    }

    btnSvgZoomOut() {
        this.oldRatio = this.ratio;
        this.ratio = this.ratio * 1.25;
        this.x -= (this.ratio - this.oldRatio) * this.width / 2;
        this.y -= (this.ratio - this.oldRatio) * this.height / 2;
        this.settingSvg(this.x, this.y);
    }

    btnUp() {
        this.y -= this.unitY;
        this.settingSvg(this.x, this.y);
    }

    btnDown() {
        this.y += this.unitY;
        this.settingSvg(this.x, this.y);
    }

    btnToLeft() {
        this.x += this.unitX;
        this.settingSvg(this.x);
    }
    btnToRight() {
        this.x -= this.unitX;
        this.settingSvg(this.x);
    }

    mapDataAndCreateCircle($social: PeopleSocials) {
        const mapLikeData: CircleModel[] = [];
        const mapShareData: CircleModel[] = [];
        const mapViewData: CircleModel[] = [];
        const mapFollowData: CircleModel[] = [];
        const data = $social.peopleSocialsByDates;
        for (let i = 0; i < data.length; i++) {
            const dateX = (new Date(data[i].createdDate).getDate() - (new Date()).getDate());
            if (data[i].like) {
                let cirLike = new CircleModel();
                cirLike.stroke = 'blue';
                cirLike.x = this.setUnitSize(dateX, this.unitX);
                cirLike.y = this.setUnitSize(data[i].like, this.unitY);
                cirLike = this.convertPosition(cirLike, this.height);
                mapLikeData.push(cirLike);
            }
            if (data[i].share) {
                let cirShare = new CircleModel();
                cirShare.stroke = 'red';
                cirShare.x = this.setUnitSize(dateX, this.unitX);
                cirShare.y = this.setUnitSize(data[i].share, this.unitY);
                cirShare = this.convertPosition(cirShare, this.height);
                mapShareData.push(cirShare);
            }
            if (data[i].view) {
                let cirView = new CircleModel();
                cirView.stroke = 'black';
                cirView.x = this.setUnitSize(dateX, this.unitX);
                cirView.y = this.setUnitSize(data[i].view, this.unitY);
                cirView = this.convertPosition(cirView, this.height);
                mapViewData.push(cirView);
            }
            if (data[i].follow) {
                let cirFollow = new CircleModel();
                cirFollow.stroke = 'green';
                cirFollow.x = this.setUnitSize(dateX, this.unitX);
                cirFollow.y = this.setUnitSize(data[i].follow, this.unitY);
                cirFollow = this.convertPosition(cirFollow, this.height);
                mapFollowData.push(cirFollow);
            }
        }
        const likeGroup = this.createGroup('like' + $social.id);
        const shareGroup = this.createGroup('share' + $social.id);
        const viewGroup = this.createGroup('view' + $social.id);
        const followGroup = this.createGroup('follow' + $social.id);
        this.createListCircles(mapLikeData, likeGroup);
        this.createListCircles(mapShareData, shareGroup);
        this.createListCircles(mapViewData, viewGroup);
        this.createListCircles(mapFollowData, followGroup);
    }

    append($circlesHtml: SVGCircleElement[] = [], $parent: SVGElement = this.svg) {

        $circlesHtml.forEach(item => {
            $parent.appendChild(item);
        });
    }

    createCircle(cir: CircleModel) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('r', (this.ratio * 5).toString());
        circle.setAttribute('cy', cir.y ? cir.y.toString() : '0');
        circle.setAttribute('cx', cir.x ? cir.x.toString() : '0');
        circle.setAttribute('fill', 'red');
        circle.setAttribute('stroke', 'black');
        circle.setAttribute('stroke-width', '2');
        circle.setAttribute('class', cir.cls ? cir.cls : '');
        return circle;
    }

    createLine($line: LineModel) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('stroke', $line.stroke);
        line.setAttribute('stroke-width', $line.strokeWidth.toString());
        line.setAttribute('x1', $line.x1.toString());
        line.setAttribute('x2', $line.x2.toString());
        line.setAttribute('y1', $line.y1.toString());
        line.setAttribute('y2', $line.y2.toString());
        return line;
    }

    createText($text: TextModel, $parent = this.svg) {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.textContent = $text.text;
        text.setAttribute('x', $text.x.toString());
        text.setAttribute('y', $text.y.toString());
        text.setAttribute('anchor', $text.anchor);
        $parent.appendChild(text);
    }

    createGroup($id: string) {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.id = $id;
        this.svg.appendChild(group);
        return group;
    }
    createListCircles(circles: CircleModel[] = [], $parent = this.svg) {
        const circlesSvg: SVGCircleElement[] = [];
        let circlePrev: CircleModel;
        circles.forEach(item => {
            if (circlePrev) {
                const line = this.createLine({
                    x1: circlePrev.x,
                    x2: item.x,
                    y1: circlePrev.y,
                    y2: item.y,
                    stroke: item.stroke,
                    strokeWidth: 5 * this.ratio
                });
                $parent.appendChild(line);
            }
            const circleNew = this.createCircle(item);

            const text = new TextModel();
            text.text = item.y.toString();
            text.x = item.x;
            text.y = item.y;
            // this.createText(text, $parent);
            circlesSvg.push(circleNew);
            $parent.appendChild(circleNew);
            circlePrev = item;
        });
        return circlesSvg;
    }

    convertPosition($cir: CircleModel, $height: number) {
        $cir.x = $cir.x;
        $cir.y = $height - $cir.y;
        return $cir;
    }
}

export class CircleModel {
    x: number;
    y: number;
    r = 10;
    stroke: string;
    strokeWidth: number;
    cls: string;
}

export class LineModel {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
    stroke: string;
    strokeWidth: number;
}

export class TextModel {
    x = 0;
    y = 0;
    anchor = 'middle';
    fontSize = 14;
    color: string;
    text: string;
}
