export class DbContext {

}
// account and post load from db
export class Account {
    email: string;
    password: string;
    confirmPassword: string;
    rememberMe: boolean;
    returnUrl: string;
}

export class Post {
    id: number;
    title: string;
    message: string;
    short: string;
    url: string;
    createdDate: string;
    updatedDate: string;
    star: number;
    typeId: number[];
    tags: string[];
    feels: Feel[];
    comments: Post[];
    imageUrl: string;
    thumbUrl: string;
    cost: number;
    sale: number;
    currencyUnit: CurrencyUnit;
    currencyUnitSale: CurrencyUnit;
    state: State;
    userName: string;
    userAvatar: string;
    userCode: string;
}
// Type load from json file
export class Type {
    id: number;
    typeParentId: number;
    typeParent: Type;
    name: string;
    class: string;
    imageUrl: string;
    thumbUrl: string;
    topIndex: number;
    activated: boolean;
    activatedDate: string;
    createdDate: string;
    updatedDate: string;
    url: string;
}
export class PostType extends Type {
    category: Category;
}


export class CategoryModel extends Type {
    isEdit = false;
}

// danh mục
export class Category extends Type {

}
// đơn vị tiền tệ
export class CurrencyUnit extends Type {

}

// trạng thái của post
export class State extends Type {
    // state start, doing, done
}
export class Feel extends Type {
    // same facebook
}

export class Product extends Post {
    // this is post model
}
