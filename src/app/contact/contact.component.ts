/* eslint-disable no-mixed-spaces-and-tabs */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  idi;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): any {
  	this.registerForm = this.formBuilder.group({
  		firstName: ['', Validators.required],
  		comment: ['', Validators.required],
  		email: ['', [Validators.required, Validators.email]]
  	});
  }
  // convenience getter for easy access to form fields
  get f(): any { return this.registerForm.controls; }

  onSubmit(): any {
  	this.submitted = true;
  	// stop here if form is invalid
  	if (this.registerForm.invalid) {
  		return;
  	}
  	this.idi = 'exampleModalCenter';
  }

  onClose(): any { location.reload(); }
}
