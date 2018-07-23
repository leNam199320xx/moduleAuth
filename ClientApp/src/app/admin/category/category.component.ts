import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Subscription } from 'rxjs';
import { HttpRequest } from '@angular/common/http';
import { CategoryModel } from '../../core/db.model';

@Component({
    selector: 'app-admin-category',
    templateUrl: 'category.html',
    styleUrls: ['category.scss']
})
export class AdminCategoryComponent implements OnDestroy, OnInit {
    categoriesSub: Subscription;
    categoryBlockSub: Subscription;
    uploadSub: Subscription;
    categoryNew: CategoryModel = new CategoryModel();
    visibleAddForm = false;
    uploadReq: HttpRequest<FormData>;
    categories: CategoryModel[] = [];
    navsSub: Subscription;
    constructor(public adminService: AdminService) {

    }

    ngOnInit() {
        this.categoriesSub = this.adminService.getCategories().subscribe(res => {
            this.categories = res.results;
        });
    }

    btnOpenAddForm() {
        this.visibleAddForm = true;
    }


    btnBlock(id: number) {
        this.categoryBlockSub = this.adminService.blockCategory(id).subscribe(res => {
            console.log(res);
        });
    }

    btnDelete(id: number) {
      this.categoryBlockSub = this.adminService.deleteCategory(id).subscribe(res => {
        console.log(res);
      });
    }

    btnNextTop($cate: CategoryModel) {

    }


    btnBackTop($cate: CategoryModel) {

    }

    btnEdit($cate: CategoryModel) {
        $cate.isEdit = !$cate.isEdit;
    }

    ngOnDestroy() {
        this.categoriesSub ? this.categoriesSub.unsubscribe() : this.categoriesSub = null;
        this.categoryBlockSub ? this.categoryBlockSub.unsubscribe() : this.categoryBlockSub = null;
    }
}
