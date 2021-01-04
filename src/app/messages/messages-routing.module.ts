import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/** COMPONENTES */
import { MainComponent } from './components/main/main.component';
import { SentComponent } from './components/sent/sent.component';
import { ReceivedComponent } from './components/received/received.component';
import { AddComponent } from './components/add/add.component';

/** SERVICIOS */
import { UserGuard } from '../services/user.guard'; 

const messagesRoutes: Routes = [
    {
        path: 'mensajes', canActivate: [UserGuard], 
        component: MainComponent, /** messages/hola */
        children: [
            { path: '', redirectTo: 'recibidos', pathMatch: 'full' }, // pathMatch -> para que haga la redireccion completa
            { path: 'enviar', component: AddComponent },
            { path: 'recibidos', component: ReceivedComponent },
            { path: 'recibidos/:page', component: ReceivedComponent },
            { path: 'enviados', component: SentComponent},
            { path: 'enviados/:page', component: SentComponent}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(messagesRoutes) /** Para aplicar las rutas en la rutas globales */
    ],
    exports: [
        RouterModule /** Para utilizarlos a fuera del modulos */
    ]
})

export class MessagesRoutingModule {}