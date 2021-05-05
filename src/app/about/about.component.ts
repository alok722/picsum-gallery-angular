import { Component } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.scss']
})
export class AboutComponent {
	onDownload(): any {
		const file = 'assets/Alok_Raj_Resume.pdf';
		const fileName = 'Alok_Raj_Resume.pdf';
		fetch(file).then(function (res) { return res.blob(); })
			.then(function (blob) {
				saveAs(blob, fileName);
			});
	}
}
