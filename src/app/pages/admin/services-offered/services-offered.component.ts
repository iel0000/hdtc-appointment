import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/auth';
import { IProduct } from '@app/shared/interface/product.interface';
import { HttpService } from '@app/shared/services';
import { environment } from '@environments/environment';
import { faBars, faBell, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-services',
  templateUrl: './services-offered.component.html',
  styleUrls: ['./services-offered.component.scss'],
})
export class ServicesOfferedComponent implements OnInit {
   pageTitle: string | undefined;
   products: IProduct[];

     constructor(
    private httpSvc: HttpService,
    private messageService: MessageService,
    private authSvc: AuthenticationService,
    private router: Router
  ) {
    this.products =[
      {
			 id: 0,
      code: "f230fh0g3",
      name: "Tooth Extraction",
      description: "Tooth Extraction",
      price: 500,
      duration: 2,
      image: 'tooth-extraction.jpeg'
		}]
  }

  ngOnInit() {
    this.pageTitle = 'Services Offered';
  }

  addNew() {
    this.router.navigate(['admin/services/new']);
  }

}
