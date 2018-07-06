
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
export class ConfigModel {
    public site: SiteConfigModel = new SiteConfigModel();
    public header: HeaderConfigModel = new HeaderConfigModel();
    public main: MainConfigModel = new MainConfigModel();
    public footer: FooterConfigModel = new FooterConfigModel();
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

export class SiteConfigModel {
    clsWidth: string;
}

export enum PrefixCls {
    position = 'pst-',
    header = 'header-',
    width = 'w-',
    height = 'h-',
    background = 'bg-',
    color = 'cl-'
}
