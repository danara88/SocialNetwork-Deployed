import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Message } from '../../../models/message';
import { Follow } from '../../../models/follow';
import { MessageService } from '../../../services/messages.service';
import { UserService } from '../../../services/user.service';
import { FollowService } from '../../../services/follow.service';
import { Global } from '../../../services/global';

@Component({
    selector: 'sent',
    templateUrl: './sent.component.html',
    providers: [ UserService, MessageService ]
})

export class SentComponent implements OnInit{
    public title: string;
    public messages: Message[];
    public follows: Follow[];
    public identity: any;
    public token: string;
    public url: string;
    public status: string;
    public page: number;
    public prevPage: any;
    public nextPage: any;
    public total: number;
    public pages: number;
    constructor(
        private _userService: UserService,
        private _messageService: MessageService,
        private _router: Router,
        private _route: ActivatedRoute
    ){
        this.title = 'Mensajes enviados';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = Global.url;
        this.page = 1;
    }

    ngOnInit(){
        this.actualPage();
    }

    getMessages(token, page){
        this._messageService.getEmmitMessages(token, page).subscribe(
            response => {
                if(!response.messages) this.status = 'noResults';

                this.messages = response.messages;
                this.total = response.total;
                this.pages = response.pages;

                if (this.pages === 0) this.pages = 1;

                if(page > this.pages) this._router.navigate(['/mensajes/enviados', 1]); // Si no existe la pagina

               
            },
            error => {
                let err = <any>error;
                if(err != null){
                    this.status = 'error';
                }
            }
        );
    }

    actualPage(){
        this._route.params.forEach((params:  Params) => {

            // Obtenemos la página
            let page = +params['page'];
            this.page = page // Importante para userlo en el componente en la condición de la paginación

            // Comprobamos si nos llega la página por parámetro
            if(!params['page']){
                page       = 1;
                this.page  = page;
            }

            if( !page ){
                page = 1;
            } else {
                this.nextPage = page + 1;
                this.prevPage = page - 1;

                if(this.prevPage <= 0){
                    this.prevPage = 1;
                }
            }
            
            // Cargar los mensajes
            this.getMessages(this.token, this.page);

        });
    }

}