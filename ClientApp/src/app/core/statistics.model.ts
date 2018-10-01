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
    peoples: People[] = [];
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
    countryCode = 'VN';
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
    people: People;
    socialId: number;
    socialName: string;
    social: Social;
    peopleSocialsByDates: PeopleSocialsByDate[];
}

export class PeopleSocialsByDate {
    peopleSocialsId: number;
    like: number;
    follow: number;
    share: number;
    view: number;
    comment: number;
    createdDate: Date;
}

export class Social extends GeneralColumn {
    id = 0;
    name: string;
    _enableEditPanel = false;
    _activated = false;
    careers: Career[] = [];
    careersMap: StatisticCardModel[] = [];
}

export class StatisticCardModel {
    name: string;
    data: CardModel[];
}
