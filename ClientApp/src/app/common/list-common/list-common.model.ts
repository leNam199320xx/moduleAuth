export class CardModel {
    title: string;
    url: string;
    imagesUrl: string;
    avatar: string;
    tags: CardModel[] = [];
    categories: CardModel[] = [];
    enabledDialog = false;
    message: string;
    convertImagesUrlToArray() {
        return this.imagesUrl.split(',');
    }
}
