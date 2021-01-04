import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { Follow } from '../../models/follow';
import { UserService } from '../../services/user.service';
import { FollowService } from '../../services/follow.service';
import { Global } from '../../services/global';

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    providers: [ UserService, FollowService ]
})

export class UsersComponent implements OnInit {
    public title: string;
    public identity: any;
    public token: string;
    public status: string;
    public total: any;
    public pages: any;
    public users: User[];
    public follows: Follow[];
    public url: string;
    public page: number;

    /* Datos para la paginación */
    public nextPage: number;
    public prevPage: number;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _userService: UserService,
        private _followService: FollowService
    ){
        this.title = 'Gente';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = Global.url;
    }

    ngOnInit(){
        this.actualPage();
    }

    actualPage(){
        this._route.params.forEach((params:  Params) => {
            let page = +params['page'];
            this.page = page // Importante para userlo en el componente en la condición de la paginación

            // Manipular si no llegó la variable page por parámetro
            if(!params['page']){
                page = 1;
                this.page = page;
            }

            if(!page){
                page = 1;
            } else {
                this.nextPage = page + 1;
                this.prevPage = page - 1;

                if(this.prevPage <= 0){
                    this.prevPage = 1;
                }
            }

            /* Devolver el listado de usuarios */
            this.getUsers(page);

        });
    }

    getUsers(page){
        this._userService.getUsers(page).subscribe(
            response => {
                if(!response.users) this.status = 'error';
                
                this.users = response.users;
                this.total = response.total;
                this.pages = response.pages;
                this.follows = response.users_following;

                if ( this.pages === 0 ) this.pages = 1;
            
                if(page > this.pages) this._router.navigate(['/gente', 1]); // Si no existe la pagina
            },
            error => {
                var errorMessage = <any>error;
                
                if(errorMessage != null){
                    this.status = 'error';
                }
            }
        );
    }

    // Seguir a un usuario
    followUser(followed){
        var follow = new Follow('',this.identity._id, followed);
        this._followService.addFollow(follow, this.token).subscribe(
            response => {
                if(!response.follow){
                    this.status = 'noResults';
                } else{
                    this.status = 'success';
                    this.follows.push(followed); // De esta manera cambian las opciones del boton de manera reactiva
                }
            },
            error => {
                let err = <any>error;
                if(err != null){
                   
                    this.status = 'error';
                }
            }
        );

    }

    // Dejar de seguir a un usuario
    unfollowUser(followed){
        this._followService.deleteFollow(followed, this.token).subscribe(
            response => {
                var search = this.follows.indexOf(followed); // Si encuentra el elemento dentro del arreglo, search será diferente a -1
                if(search != -1){
                    this.follows.splice(search, 1); // Borrar el elemento que ha encontrado en search dentro del arreglo follows
                }
            },
            error => {
                let err = <any>error;
                if(err != null){
                    
                    this.status = 'error';
                }
            }
        );
    }



}