export class CardModel {
    title: string;
    url: string;
    imagesUrl: string;
    tags: CardModel[] = [];
    categories: CardModel[] = [];

    convertImagesUrlToArray() {
        return this.imagesUrl.split(',');
    }
}
