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
    name: string;
    imageUrl: string;
    createdDate: string;
    updatedDate: string;
}

export class CurrencyUnit extends Type {

}

export class State extends Type {
    // state start, doing, done
}
export class Feel extends Type {
    // same facebook
}

export class Product extends Post {
    // this is post model
}
