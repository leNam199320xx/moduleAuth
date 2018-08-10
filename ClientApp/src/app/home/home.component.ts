import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardModel } from '../common/list-common/list-common.model';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html'
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

    setNewCards() {
        const newCards: CardModel[] = [];
        this.cards.forEach(item => {
            const c = new CardModel();
            c.categories = item.categories;
            c.imagesUrl = item.imagesUrl;
            c.tags = item.tags;
            c.title = item.title;
            c.url = item.url;
            newCards.push(c);
        });
        return newCards;
    }
}
