import { Component, Input } from '@angular/core';
import { Social } from '../../../statistics/statistics.model';

@Component({
    selector: 'app-admin-people-addsocial',
    templateUrl: '+add-social.html'
})
export class AdminPeopleAddSocialComponent {
    @Input() social = new Social();
}
