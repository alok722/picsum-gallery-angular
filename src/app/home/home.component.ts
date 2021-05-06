/* eslint-disable no-mixed-spaces-and-tabs */
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { GalleryService } from '../services/gallery.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { saveAs } from 'file-saver';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { shuffle } from 'lodash-es';

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
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

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

  gallery: any;
  gallerySubscription;
  randomImage = 'https://picsum.photos/1100/500';

  length;
  pageSize = 6;
  page = 1;

  constructor(private galleryService: GalleryService, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  openDialog(url): void {
  	this.dialog.open(DialogOverviewExampleDialog, {
  		data: url
  	});
  }

  ngOnInit(): any {
  	this.getData();
  }

  getData(): any {
  	this.gallerySubscription = this.galleryService.getData(`list?page=${this.page}&limit=${this.pageSize}`).subscribe(data => {
  		this.gallery = shuffle(data);
  		this.length = 600;
  	});
  }
  ngOnDestroy(): any {
  	this.gallerySubscription.unsubscribe();
  }

  onPageChange(event): any {
  	console.log(event);
  	this.gallerySubscription = this.galleryService
  		.getData(
  			`list?page=${event.pageIndex + 1}&limit=${this.pageSize}`
  		)
  		.subscribe(data => {
  			this.gallery = shuffle(data);
  			this.length = 600;
  		});
  }

  onFavorite(image): any {
  	console.log(image);

  	let items = [];
  	const val = localStorage.getItem('items');

  	if (val !== null) {
  		items = JSON.parse(val);
  	}
  	items.push(image);
  	localStorage.setItem('items', JSON.stringify(items));
  	this.snackBar.open('Added to Favorite', 'Close', {
  		duration: 2000
  	});
  }

  onDownload(url: string): any {
  	const fileName = Date.now() + '-image.png';
  	fetch(url).then(function (res) { return res.blob(); })
  		.then(function (blob) {
  			saveAs(blob, fileName);
  		});
  }
}
