import { CardModel } from '../common/list-common/list-common.model';

export class Career {
    name: string;
    data: People[] = [];
}
export class People {
    full_name: string;
    artist_name: string;
    url: string;
    imageUrl: string;
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

export class StatisticCardModel {
    name: string;
    data: CardModel[];
}
