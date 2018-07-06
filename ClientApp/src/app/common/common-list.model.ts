export class ListModel {
    items: ListItemModel[] = [];
    name: string;
}

export class ListItemModel {
    text: string;
    value: string | number;
    url: string;
}
