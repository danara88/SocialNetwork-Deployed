import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Message } from '../../../models/message';
import { Follow } from '../../../models/follow';
import { MessageService } from '../../../services/messages.service';
import { UserService } from '../../../services/user.service';
import { FollowService } from '../../../services/follow.service';
import { Global } from '../../../services/global';

@Component({
    selector: 'add',
    templateUrl: './add.component.html',
    providers: [ UserService, MessageService ]
})

export class AddComponent implements OnInit{
    public title: string;
    public message: Message;
    public follows: Follow[];
    public identity: any;
    public token: string;
    public url: string;
    public status: string;
    constructor(
        private _userService: UserService,
        private _messageService: MessageService,
        private _router: Router,
        private _route: ActivatedRoute
    ){
        this.title = 'Enviar mensaje';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = Global.url;
        this.message = new Message('',this.identity._id,'','','','');
    }
    ngOnInit(){
        this.getMyFollows();

    }

    onSubmit(form){
       this._messageService.addMessage(this.message, this.token).subscribe(
           response => {
                if(response.message){
                    this.status = 'success';
                    form.reset();
                } else {
                    this.status = 'noResults'; 
                }
           },
           error => {
               let err = <any> error;
               if(err != null){
                    this.status = 'error';
               }
           }
       );
       
    }

    getMyFollows(){
        this._messageService.getMyFollows(this.token).subscribe(
            response => {
                if(!response.follows) this.status = 'noResults';
                this.follows = response.follows;
                console.log(this.follows);
            },
            error => {
                let err = <any>error;
                if(err != null){
                    this.status = 'error';
                }
            }
        );
    }

    closeMessage(){ this.status = null; }
}