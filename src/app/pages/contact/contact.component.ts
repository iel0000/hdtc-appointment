import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  
  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobileNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
   }

  ngOnInit(): void {

  }
  displayModal!: boolean;
  showDialog() {
    this.displayModal = true;
}

// Control Validator
validateControl(controlName: string): boolean {
  if (
    (this.contactForm.get(controlName)?.dirty ||
      this.contactForm.get(controlName)?.touched) &&
    this.contactForm.get(controlName)?.invalid
  ) {
    return true;
  }
  return false;
}

}
