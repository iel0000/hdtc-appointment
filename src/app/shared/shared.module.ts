import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { PrimeNgModule } from './primeng.module';
import { GoogleMap, GoogleMapsModule, MapDirectionsRenderer } from '@angular/google-maps';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    PrimeNgModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    GoogleMapsModule, 
  ],
  providers: [],
  exports: [ReactiveFormsModule, PrimeNgModule],
})
export class SharedModule {}
