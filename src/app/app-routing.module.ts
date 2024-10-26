import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentComponent } from './pages/appointment/appointment.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import {
  ReviewComponent,
  ScheduleComponent,
} from './pages/appointment';
import { ErrorComponent } from './pages/error/error.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginGuard } from './core/login';
import { AuthGuard } from './core/auth';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminLayoutComponent } from './shared/layout/layout.component';
import { ServicesOfferedComponent } from './pages/admin/services-offered/services-offered.component';
import { ServicesFormComponent } from './pages/admin/services-offered/services-form/services-form.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent
  },
  {
    path: 'appointment',
    component: AppointmentComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: 'schedule', pathMatch: 'full' },
      { path: 'schedule', component: ScheduleComponent },
      { path: 'review', component: ReviewComponent },
    ],
  },
  {
    path: 'contact_us',
    component: ContactComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'services/:action',
        component: ServicesFormComponent,
        canActivate: [AuthGuard],
        data: { role: 'Admin' },
      },
      {
        path: 'services/:action/:id',
        component: ServicesFormComponent,
        canActivate: [AuthGuard],
        data: { role: 'Admin' },
      },
      {
        path: 'services',
        component: ServicesOfferedComponent,
        canActivate: [AuthGuard]
      },
    ]
  },
  
  {
    path: '**',
    component: ErrorComponent, //add error page
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
