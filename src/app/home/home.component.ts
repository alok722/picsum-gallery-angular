import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { GalleryService } from '../services/gallery.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {saveAs} from 'file-saver';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  image: string;
}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  gallery : any;
  gallerySubscription;

  length;
  pageSize = 6;
  page = 1;

  constructor(private galleryService: GalleryService,private snackBar: MatSnackBar, public dialog: MatDialog) { }

  openDialog(url): void {
    this.dialog.open(DialogOverviewExampleDialog, {
      data: url
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.gallerySubscription = this.galleryService.getData(`list?page=${this.page}&limit=${this.pageSize}`).subscribe(data => {
    	this.gallery=data;
      this.length = 600;
    });
  }
  ngOnDestroy() {
    this.gallerySubscription.unsubscribe();
  }

  onPageChange(event) {
    console.log(event);
    this.gallerySubscription = this.galleryService
      .getData(
        `list?page=${event.pageIndex + 1}&limit=${this.pageSize}`
      )
      .subscribe(data => {
        this.gallery = data;
        this.length = 180;
      });
  }

  onFavorite(image) {
    console.log(image);

    let items = [];
    const val = localStorage.getItem('items');

    if (val !== null) {
      items = JSON.parse(val);
    }
    items.push(image);
    localStorage.setItem('items', JSON.stringify(items));
    this.snackBar.open('Added to Favorite', 'Close', {
     duration: 2000});
  }

  onDownload(url) {
    let fileName = Date.now() + '-image.png'
    fetch(url).then(function(res) {return res.blob()})
    .then(function(blob) {
      saveAs(blob, fileName)
    })
  }
}
