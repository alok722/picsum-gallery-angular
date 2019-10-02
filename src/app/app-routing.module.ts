import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent} from './contact/contact.component'

import { FavouritesComponent } from './favourites/favourites.component';

const routes: Routes = [
{
	path: '',
	component: HomeComponent
},
{
	path: 'favorites',
	component: FavouritesComponent
},
{
	path: 'contact',
	component: ContactComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
