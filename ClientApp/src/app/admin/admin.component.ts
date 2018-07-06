import { Component, OnInit } from '@angular/core';
import { NavService } from '../nav/nav.service';
import { NavModel } from '../nav/nav.model';
import { ActivatedRoute } from '../../../node_modules/@angular/router';

@Component({
    selector: 'app-admin',
    templateUrl: 'admin.html',
    styleUrls: ['admin.css']
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
        this.navService.sourceSubject.next(this.navService.sourceNavLeft);
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(res => {
            const param = this.activatedRoute.snapshot.paramMap.get('page');
            this.routeName = param ? param.toLowerCase() : '';
            console.log(this.routeName);
        });
    }
}