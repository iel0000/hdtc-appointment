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
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { InputNumberModule } from 'primeng/inputnumber';
import { KeyFilterModule } from 'primeng/keyfilter';
import { PanelMenuModule } from 'primeng/panelmenu';
import { FieldsetModule } from 'primeng/fieldset';
import { ChartModule } from 'primeng/chart';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { ChipModule } from 'primeng/chip';
import { SkeletonModule } from 'primeng/skeleton';

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
    CardModule,
    TableModule,
    ConfirmDialogModule,
    ToolbarModule,
    InputNumberModule,
    KeyFilterModule,
    PanelMenuModule,
    FieldsetModule,
    ChartModule,
    MegaMenuModule,
    MenuModule,
    ChipModule,
    SkeletonModule,
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
    SidebarModule,
    RadioButtonModule,
    RippleModule,
    TableModule,
    ConfirmDialogModule,
    ToolbarModule,
    InputNumberModule,
    KeyFilterModule,
    PanelMenuModule,
    FieldsetModule,
    ChartModule,
    MegaMenuModule,
    MenuModule,
    ChipModule,
    SkeletonModule,
  ],
})
export class PrimeNgModule {}
