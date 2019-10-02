import { Component, OnInit, OnDestroy } from '@angular/core';
import { GalleryService } from '../services/gallery.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private galleryService: GalleryService,private snackBar: MatSnackBar) { }

  ngOnInit() {
  	this.getData();
  }

  getData() {
    this.gallerySubscription = this.galleryService.getData(`list?page=${this.page}&limit=${this.pageSize}`).subscribe(data => {
    	this.gallery=data;
      this.length = 180;
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

}
