import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { MomentModule } from 'angular2-moment';
import { AppRoutingModule } from './app-routing.module';

/** MODULO CUSTOMIZADO */
import { MessagesModule } from './messages/messages.module';

/** SERVICIOS */
import { UserService } from './services/user.service';
import { UserGuard } from './services/user.guard';

/** COMPONENTES */
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SidebarComponent } from "./components/sidebar/sidebar.componet";
import { TimelineComponent } from "./components/timeline/timeline.component";
import { PublicationsComponent } from "./components/publications/publications.component";
import { FollowingComponent } from "./components/following/following.component";
import { FollowedComponent } from "./components/followed/followed.component";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserEditComponent,
    UsersComponent,
    SidebarComponent,
    TimelineComponent,
    ProfileComponent,
    PublicationsComponent,
    FollowingComponent,
    FollowedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    FormsModule,
    HttpClientModule,
    MomentModule,
    MessagesModule
  ],
  providers: [
    appRoutingProviders,
    UserService,
    UserGuard // Una ves puesto aqui, puedo aplicarlo a cualquiera de mis rutas
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
