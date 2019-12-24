import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {
	images;
  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
  	this.getFavorites();
  }

  getFavorites() {
    const val = localStorage.getItem('items');
    if (val !== null) {
      this.images = JSON.parse(val);
    }
  }

  onDownload(url) {
    let fileName = Date.now() + '-image.png'
    fetch(url).then(function(res) {return res.blob()})
    .then(function(blob) {
      saveAs(blob, fileName)
    })
  }

  onUnfavorite(image) {
    const index = this.images.indexOf(image);
    this.images.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(this.images));
    this.snackBar.open('Removed from Favorite', 'Close', {
     duration: 2000});
  }
}
