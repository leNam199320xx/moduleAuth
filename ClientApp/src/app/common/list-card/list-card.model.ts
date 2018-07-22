export class CardModel {
    title: string;
    url: string;
    imagesUrl: string;

    convertImagesUrlToArray() {
        return this.imagesUrl.split(',');
    }
}
