import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.css']
})
export class HomeComponent {
    constructor(private activatedRoute: ActivatedRoute) {

    }
}
