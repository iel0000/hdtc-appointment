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
   isLoading: boolean = true;

     constructor(
    private httpSvc: HttpService,
    private messageService: MessageService,
    private authSvc: AuthenticationService,
    private router: Router
  ) {
    this.products =[]
  }

  ngOnInit() {
    this.pageTitle = 'Services Offered';
    this.loadProducts();
  }

  addNew() {
    this.router.navigate(['admin/services/new']);
  }

  loadProducts() {
    this.httpSvc
      .get(`Admin/GetServices`)
      .subscribe(response => {
        this.products = response;
        this.isLoading = false;
      });
  }

  editItem(product: IProduct) {
    this.router.navigate([`admin/services/edit/${product.id}`]);
  }

}
