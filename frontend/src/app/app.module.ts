import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule, BsDatepickerConfig,  BsLocaleService } from 'ngx-bootstrap/datepicker';
// import { de } from 'ngx-bootstrap/locale';
// defineLocale('de', de);
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
// import { PreviewComponent } from './pages/eventpreview/preview/preview.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,  
    RegisterComponent,
    // PreviewComponent
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(), 
    BsDatepickerModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // ToastrModule.forRoot(),
    NgbModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  // exports:[
  //   HeaderComponent,
  // ],
  providers: [BsLocaleService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
