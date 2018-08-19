import { CardModel } from '../common/list-common/list-common.model';

export class GeneralColumn {
    id: number;
    updatedDate: Date;
    createdDate: Date;
    index: number;
    enabled: boolean;
    _isNew = false;
}

export class Career extends GeneralColumn {
    name: string;
    data: People[] = [];
    _enabledAddPeople = false;
}
export class People extends GeneralColumn {
    fullName: string;
    shortName: string;
    url: string;
    imagesUrl: string;
    thumbnailUrl: string;
    message: string;
    avatar: string;
    careerId: number;
    socials: PeopleSocials[] = [];
    _enabledAddSocial = false;
    _enabledUpdatePeople = false;
}

export class PeopleSocials extends GeneralColumn {
    like: number;
    follow: number;
    share: number;
    view: number;
    url: string;
    peopleId: number;
    peopleName: string;
    socialId: number;
    socialName: string;
}

export class Social extends GeneralColumn {
    id: number;
    name: string;
    createdDate: Date;
    updatedDate: Date;
}

export class StatisticCardModel {
    name: string;
    data: CardModel[];
}
