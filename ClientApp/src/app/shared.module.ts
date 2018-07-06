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
import { PageService } from './page/page.service';
import { ListIconComponent } from './common/list-icon/list-icon.component';
import { ListLinkComponent } from './common/list-link/list-link.component';
import { ListPostComponent } from './common/list-post/list-post.component';
import { PostComponent } from './common/post/post.component';
import { NavService } from './nav/nav.service';
@NgModule({
    declarations: [
        ListButtonComponent,
        ListCardComponent,
        ListIconComponent,
        ListLinkComponent,
        ListPostComponent,
        PostComponent,
        PageHomeComponent,
        PageSearchComponent,
        PageDetailComponent,
        PageListComponent
    ],
    imports: [],
    exports: [
        HttpClientModule,
        CommonModule,
        FormsModule,
        BrowserModule,
        RouterModule
    ],
    providers: []
})
export class SharedModule {

}