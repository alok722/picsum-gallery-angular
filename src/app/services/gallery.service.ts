import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

const apiUrl = environment.apiUrl;

@Injectable({
	providedIn: 'root'
})
export class GalleryService {

	constructor(private http: HttpClient) { }
	getData(url): any {
		return this.http.get(`${apiUrl}/${url}`).pipe(
			tap(value => {
				console.log(value);
			})
		);
	}
}
