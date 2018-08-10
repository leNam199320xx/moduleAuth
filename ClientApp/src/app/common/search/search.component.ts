import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-search',
    templateUrl: 'search.html'
})

export class SearchComponent {
    @Output() enterKeyEvent: EventEmitter<string> = new EventEmitter();
    key: string;
    suggestKeys: string[];
    btnSearch() {
        this.enterKeyEvent.emit(this.key);
    }
}
