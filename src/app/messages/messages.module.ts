/** MODULO */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';

/** RUTAS */
import { MessagesRoutingModule } from './messages-routing.module';

/** COMPONENTES */
import { MainComponent } from './components/main/main.component';
import { SentComponent } from './components/sent/sent.component';
import { ReceivedComponent } from './components/received/received.component';
import { AddComponent } from './components/add/add.component';

/** SERVICIOS */
import { UserService } from '../services/user.service';
import { UserGuard } from '../services/user.guard'; 

/** DECORADOR PARA EL MODULO */
@NgModule({
    declarations: [
        /** Declaramos los componentes */
        MainComponent,
        SentComponent,
        ReceivedComponent,
        AddComponent
    ],
    imports: [
        /** Declaramos los modulos */
        CommonModule,
        FormsModule,
        MessagesRoutingModule,
        BrowserModule,
        MomentModule
    ],
    exports: [
        /** Exportar componentes para utilizarlos fuera del modulo */
        MainComponent,
        SentComponent,
        ReceivedComponent,
        AddComponent
    ],
    providers: [
        /** Los servicios */
        UserService,
        UserGuard
    ]
})

export class MessagesModule {} /** Esta clase la vamos a importar al archivo global de modulos de la aplicación */

