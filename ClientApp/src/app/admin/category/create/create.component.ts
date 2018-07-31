import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

import { HttpRequest } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AdminService } from '../../admin.service';
import { CategoryModel } from '../../../core/db.model';

@Component({
    selector: 'app-admin-category-create',
    templateUrl: 'create.html'
})

export class AdminCategoryCreateComponent implements OnInit, OnDestroy {
    @Input() category: CategoryModel;
    @Output() closeForm: EventEmitter<boolean> = new EventEmitter();
    uploadReq: HttpRequest<FormData>;
    navs: any[];
    uploadSub: Subscription;
    categorySub: Subscription;
    navsSub: Subscription;
    constructor(public adminService: AdminService) {
        if (!this.category) {
            this.category = new CategoryModel();
        }
    }

    ngOnInit(): void {

        this.navsSub = this.adminService.getNavConfig().subscribe(res => {
            this.navs = res;
        });
    }
    ngOnDestroy() {
        this.uploadSub ? this.uploadSub.unsubscribe() : this.uploadSub = null;
        this.navsSub ? this.navsSub.unsubscribe() : this.navsSub = null;
    }
    setFile($event: Event) {
        const files = (<HTMLInputElement>$event.target).files;
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {

            formData.append('file' + i, files[i]);
        }
        this.uploadReq = new HttpRequest('POST',
            'api/admin/uploadfiles'
            , formData, {
                reportProgress: true
            });
    }
    btnUpload() {
        this.adminService.uploadFiles(this.uploadReq);
    }
    btnSave() {
        this.categorySub = this.adminService.saveCategory(this.category).subscribe(res => { });
    }
    btnCloseAddForm() {
        this.closeForm.emit(true);
    }
}
