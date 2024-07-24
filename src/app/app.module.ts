import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { DashbordComponent } from './pages/dashbord/dashbord.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { LivreursComponent } from './pages/livreurs/livreurs.component';
import { VendeursComponent } from './pages/vendeurs/vendeurs.component';
import { InventionComponent } from './pages/invention/invention.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Importez MatSnackBarModule


 import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalindarComponent } from './pages/calindar/calindar.component';
import { SousAdminComponent } from './pages/sous-admin/sous-admin.component';
import { DetailsInvitationComponent } from './pages/details-invitation/details-invitation.component';
import { LoginComponent } from './pages/login/login.component';
import { InvitationComponent } from './pages/invitation/invitation.component';
import { ConfirmDialogComponent } from './pages/confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { MondalLivreurComponent } from './mondal-livreur/mondal-livreur.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashbordComponent,
    ClientsComponent,
    LivreursComponent,
    VendeursComponent,
    InventionComponent,
    CalindarComponent,
    SousAdminComponent,
    DetailsInvitationComponent,
    LoginComponent,
    InventionComponent,
    InvitationComponent,
    ConfirmDialogComponent,
    ModalComponent,
    MondalLivreurComponent,

    
    
  ],
  imports: [
    HttpClientModule,
    BrowserModule,MatButtonModule,MatSelectModule,
    AppRoutingModule,FormsModule,MatNativeDateModule,MatIconModule,
    MatSnackBarModule, 
    BrowserAnimationsModule,MatDatepickerModule,MatFormFieldModule,MatInputModule,MatDialogModule,    FormsModule,
    ReactiveFormsModule, 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
