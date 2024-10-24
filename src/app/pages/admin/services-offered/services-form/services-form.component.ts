import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/core/auth';
import { IProduct } from '@app/shared/interface/product.interface';
import { HttpService } from '@app/shared/services';
import { environment } from '@environments/environment';
import { faBars, faBell, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-services-form',
  templateUrl: './services-form.component.html',
  styleUrls: ['./services-form.component.scss'],
})
export class ServicesFormComponent implements OnInit {
  title = "Create New Service"
  isEdit = false;
  productForm: FormGroup

     constructor(
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private httpSvc: HttpService,
      private messageService: MessageService,
  ) {
    this.productForm = this.fb.group({
      id: 0,
      name: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.min(1)],
      duration:[0, Validators.min(1)],
      image: ['']
    })
  }

  ngOnInit() {
  }

  save() {

  }

  validateControl(controlName: string): boolean {
    if (
      (this.productForm.get(controlName)?.dirty ||
        this.productForm.get(controlName)?.touched) &&
      this.productForm.get(controlName)?.invalid
    ) {
      return true;
    }
    return false;
  }

}
