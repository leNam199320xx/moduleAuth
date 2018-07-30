export class CardModel {
    title: string;
    url: string;
    imagesUrl: string;
    tags: CardModel[] = [];
    categories: CardModel[] = [];
    enabledDialog = false;
    message: string;
    constructor() {
        this.enabledDialog = false;
    }
    convertImagesUrlToArray() {
        return this.imagesUrl.split(',');
    }
}
