import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatToolbarModule,
		MatCardModule,
		MatIconModule,
		MatChipsModule,
		MatSnackBarModule,
		MatProgressSpinnerModule,
		MatPaginatorModule,
		MatDialogModule
	],
	exports:[
		MatButtonModule,
		MatToolbarModule,
		MatCardModule,
		MatIconModule,
		MatChipsModule,
		MatSnackBarModule,
		MatProgressSpinnerModule,
		MatPaginatorModule,
		MatDialogModule
	],
	declarations: []
})
export class MaterialModule { }
