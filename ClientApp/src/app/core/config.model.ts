export class SiteConfigModel {
    clsWidth: string;
}

export class GeneralConfigModel {
    clsPosition: string;
    clsWidth: string;
    clsHeight: string;
    clsBgColor: string;
    clsColor: string;
    clsTheme: string;
    clsFontSize: string;

    name: string;
    children: GeneralConfigModel[];
}
export class FooterConfigModel extends GeneralConfigModel {
    setDefault() { }
}
export class MainConfigModel extends GeneralConfigModel {
    setDefault() { }
}
export class HeaderConfigModel extends GeneralConfigModel {
    setDefault() { }
}
export class ConfigModel {
    site = new SiteConfigModel();
    header = new HeaderConfigModel();
    main = new MainConfigModel();
    footer = new FooterConfigModel();
}


export enum PrefixCls {
    position = 'pst-',
    header = 'header-',
    width = 'w-',
    height = 'h-',
    background = 'bg-',
    color = 'cl-'
}
