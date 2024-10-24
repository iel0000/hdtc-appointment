import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { SidebarModule } from 'primeng/sidebar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { AvatarModule } from 'primeng/avatar';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { StepsModule } from 'primeng/steps';
import { DividerModule } from 'primeng/divider';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';

@NgModule({
  declarations: [],
  imports: [
    InputTextModule,
    PasswordModule,
    MenubarModule,
    ButtonModule,
    StyleClassModule,
    SidebarModule,
    RadioButtonModule,
    InputSwitchModule,
    RippleModule,
    AvatarModule,
    CalendarModule,
    CheckboxModule,
    MultiSelectModule,
    DropdownModule,
    StepsModule,
    InputTextareaModule,
    PanelModule,
    ToastModule,
    DialogModule,
    TagModule,
    
  ],
  providers: [MessageService, ConfirmationService],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    InputTextModule,
    PasswordModule,
    MenubarModule,
    ButtonModule,
    RadioButtonModule,
    StyleClassModule,
    AvatarGroupModule,
    BadgeModule,
    AvatarModule,
    CalendarModule,
    CheckboxModule,
    MultiSelectModule,
    DropdownModule,
    CardModule,
    StepsModule,
    DividerModule,
    InputTextareaModule,
    PanelModule,
    ToastModule,
    DialogModule,
    TagModule,
  ],
})
export class PrimeNgModule {}
