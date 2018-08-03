import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavService } from '../header/nav/nav.service';

@Component({
    selector: 'app-admin',
    templateUrl: 'admin.html'
})
export class AdminComponent implements OnInit {
    public routeName: string;
    constructor(
        public navService: NavService,
        public activatedRoute: ActivatedRoute
    ) {
        this.navService.visibleLeft = true;
        this.navService.sourceNavLeft = [];
        this.navService.sourceNavLeft.push({
            value: 'Post',
            icon: null,
            positionIcon: 'left',
            url: '/post',
            index: 1
        });
        this.navService.sourceNavLeft.push({
            value: 'Provider',
            icon: null,
            positionIcon: 'left',
            url: '/provider',
            index: 2
        });
        this.navService.sourceNavLeft.push({
            value: 'Post Type',
            icon: null,
            positionIcon: 'left',
            url: '/post-type',
            index: 3
        });
        this.navService.sourceNavLeft.push({
            value: 'Category',
            icon: null,
            positionIcon: 'left',
            url: '/category',
            index: 4
        });
        this.navService.sourceSubject.next(this.navService.sourceNavLeft);
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(res => {
            const param = this.activatedRoute.snapshot.paramMap.get('page');
            this.routeName = param ? param.toLowerCase() : '';
        });
    }
}
