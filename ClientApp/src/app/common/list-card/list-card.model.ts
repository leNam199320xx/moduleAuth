export class CardModel {
    title: string;
    url: string;
    imagesUrl: string;
    message: string;
    tags: CardModel[] = [];
    categories: CardModel[] = [];

    convertImagesUrlToArray() {
        return this.imagesUrl.split(',');
    }
}
