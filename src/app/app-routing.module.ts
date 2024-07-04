import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from './pages/dashbord/dashbord.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { LivreursComponent } from './pages/livreurs/livreurs.component';
import { VendeursComponent } from './pages/vendeurs/vendeurs.component';
import { SousAdminComponent } from './pages/sous-admin/sous-admin.component';
import { DetailsInvitationComponent } from './pages/details-invitation/details-invitation.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards';
import { InvitationComponent } from './pages/invitation/invitation.component';

const routes: Routes = [
  {path:"index", component:DashbordComponent},
  {path:"Client",component:ClientsComponent},
  {path:"Livreurs", component:LivreursComponent},
  {path:"vendeur", component:VendeursComponent},
  {path:"sousAdmin", component:SousAdminComponent},
  {path:"detailInvitation", component:DetailsInvitationComponent},
  
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashbordComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'ride-detail/:id', component: InvitationComponent }



];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
