import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ListButtonComponent } from './common/list-button/list-button.component';
import { ListCardComponent } from './common/list-card/list-card.component';
import { PageHomeComponent } from './page/home/page-home.component';
import { PageSearchComponent } from './page/search/page-search.component';
import { PageDetailComponent } from './page/detail/page-detail.component';
import { PageListComponent } from './page/list/page-list.component';
import { ListIconComponent } from './common/list-icon/list-icon.component';
import { ListLinkComponent } from './common/list-link/list-link.component';
import { ListPostComponent } from './common/list-post/list-post.component';
import { PostComponent } from './common/post/post.component';
import { PagingComponent } from './common/paging/paging.component';
import { ListCommonComponent } from './common/list-common/list-common.component';
import { ListDialogComponent } from './common/list-common/dialog/dialog.component';
import { PostSimpleComponent } from './common/post-simple/post-simple.component';
import { ListExtendPanelComponent } from './common/list-common/extend-panel/extend-panel.component';
import { CardCommonComponent } from './common/card-common/card-common.component';
import { ConfigLayoutComponent } from './common/config-layout.component';
import { ListItemComponent } from './common/list-item/list-item.component';
@NgModule({
    declarations: [
        ListButtonComponent,
        ListCardComponent,
        ListIconComponent,
        ListLinkComponent,
        ListPostComponent,
        ListCommonComponent,
        ListDialogComponent,
        ListExtendPanelComponent,
        ListItemComponent,
        CardCommonComponent,
        PostComponent,
        PostSimpleComponent,
        PageHomeComponent,
        PageSearchComponent,
        PageDetailComponent,
        PageListComponent,
        PagingComponent,
        ConfigLayoutComponent
    ],
    imports: [CommonModule, FormsModule, RouterModule],
    exports: [
        ListCommonComponent,
        ListCardComponent,
        ListPostComponent,
        ListLinkComponent,
        ListDialogComponent,
        ListExtendPanelComponent,
        ListItemComponent,
        CardCommonComponent,
        PostSimpleComponent,
        HttpClientModule,
        CommonModule,
        FormsModule,
        BrowserModule,
        RouterModule
    ],
    providers: [],
    entryComponents: [ListDialogComponent]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: []
        };
    }
}
