import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-list-dialog',
    templateUrl: 'dialog.html',
    styleUrls: ['dialog.scss']
})
export class ListDialogComponent {
    constructor(public dialogRef: MatDialogRef<ListDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
}
