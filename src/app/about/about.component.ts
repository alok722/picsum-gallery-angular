import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onDownload() {
    let file = '../../assets/Alok_Raj_Resume.pdf'
    let fileName = 'Alok_Raj_Resume.pdf';
    fetch(file).then(function(res) {return res.blob()})
    .then(function(blob) {
      saveAs(blob, fileName)
    })
  }

}
