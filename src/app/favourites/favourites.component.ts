/* eslint-disable no-mixed-spaces-and-tabs */
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-favourites',
	templateUrl: './favourites.component.html',
	styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {
  images = [];
  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): any {
  	this.getFavorites();
  }

  getFavorites(): any {
  	const val = localStorage.getItem('items');
  	if (val !== null) {
  		this.images = JSON.parse(val);
  	}
  }

  onDownload(url: string): any {
  	const fileName = Date.now() + '-image.png';
  	fetch(url).then(function (res) { return res.blob(); })
  		.then(function (blob) {
  			saveAs(blob, fileName);
  		});
  }

  onUnfavorite(image: number): any {
  	const index = this.images.indexOf(image);
  	this.images.splice(index, 1);
  	localStorage.setItem('items', JSON.stringify(this.images));
  	this.snackBar.open('Removed from Favorite', 'Close', {
  		duration: 2000
  	});
  }
}
