import { Component, OnDestroy } from '@angular/core';
import { AdminService } from '../admin.service';
import { Subscription } from 'rxjs';
import { CategoryModel } from './category.model';
import { HttpRequest, HttpParams, HttpHeaders } from '../../../../node_modules/@angular/common/http';

@Component({
    selector: 'app-admin-category',
    templateUrl: 'category.html',
    styleUrls: ['category.scss']
})
export class AdminCategoryComponent implements OnDestroy {
    categoriesSub: Subscription;
    categorySub: Subscription;
    uploadSub: Subscription;
    categoryNew: CategoryModel = new CategoryModel();
    visibleAddForm = false;
    uploadReq: HttpRequest<FormData>;
    constructor(public adminService: AdminService) {
        this.categoriesSub = this.adminService.getCategories().subscribe(res => {
            console.log(res);
        });
    }

    btnOpenAddForm() {
        this.visibleAddForm = true;
    }

    btnCloseAddForm() {
        this.visibleAddForm = true;
    }

    btnSave() {
        this.categorySub = this.adminService.saveCategory(this.categoryNew).subscribe(res => {
            console.log(res);
        });
    }

    btnUpload() {
        // this.uploadSub = this.adminService.uploadFiles().subscribe(res => {
        //     console.log('upload ' + res);
        // });
        this.adminService.uploadFiles(this.uploadReq);
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

    ngOnDestroy() {
        this.categoriesSub ? this.categoriesSub.unsubscribe() : this.categoriesSub = null;
        this.categorySub ? this.categorySub.unsubscribe() : this.categorySub = null;
        this.uploadSub ? this.uploadSub.unsubscribe() : this.uploadSub = null;
    }
}
