import { CardModel } from '../common/list-common/list-common.model';

export class Career {
    name: string;
    index: number;
    data: People[] = [];
    enabledAddPeople = false;
}
export class People {
    fullname: string;
    shortname: string;
    url: string;
    imagesUrl: string;
    thumbnailUrl: string;
    message: string;
    avatar: string;
    socials: Social[] = [];
}

export class Social {
    name: string;
    like: number;
    share: number;
    follow: number;
    view: number;
}

export enum SocialName {
    facebook = 'facebook',
    googleplus = 'google-plus',
    youtube = 'youtube',
    twitter = 'twitter'
}

export class StatisticCardModel {
    name: string;
    data: CardModel[];
}
