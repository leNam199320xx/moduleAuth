import { NgModule } from '@angular/core';
import { CreaterComponent } from './creater.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [CreaterComponent],
    imports: [RouterModule.forChild([
        { path: '', component: CreaterComponent, pathMatch: 'full' }
    ])],
    exports: [RouterModule],
    providers: []
})

export class CreaterModule {
}
