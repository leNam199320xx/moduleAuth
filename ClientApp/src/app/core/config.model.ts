export class ConfigModel {
    public site: SiteConfigModel = new SiteConfigModel();
    public header: HeaderConfigModel = new HeaderConfigModel();
    public main: MainConfigModel = new MainConfigModel();
    public footer: FooterConfigModel = new FooterConfigModel();
}
export class FooterConfigModel {
    clsBgColor: string;
    clsColor: string;
    clsTheme: string;
}
export class MainConfigModel {
    clsBgColor: string;
    clsColor: string;
    clsTheme: string;
}
export class HeaderConfigModel {
    clsPosition: string;
    clsBgColor: string;
    clsColor: string;
    clsTheme: string;

    setDefault() {
        this.clsPosition = 'pst-fixed';
        this.clsTheme = 'nam-theme';
    }
}

export class SiteConfigModel {
    clsWidth: string;
}
