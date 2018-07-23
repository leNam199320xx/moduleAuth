import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardModel } from '../common/list-card/list-card.model';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.css']
})
export class HomeComponent {
    cards: CardModel[] = [];

    constructor(private activatedRoute: ActivatedRoute) {
        for (let i = 0; i < 100; i++) {
            const card = {
                url: '/',
                title: 'Máy ảnh canon',
                imagesUrl: '/assets/images/canon200x200.jpg'
            } as CardModel;
            card.title += ' - ' + i;
            this.cards.push(card);
        }
    }
}
