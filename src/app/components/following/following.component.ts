import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { Follow } from '../../models/follow';
import { UserService } from '../../services/user.service';
import { FollowService } from '../../services/follow.service';
import { Global } from '../../services/global';

@Component({
    selector: 'following',
    templateUrl: './following.component.html',
    providers: [ UserService, FollowService ]
})

export class FollowingComponent implements OnInit {
    public title: string;
    public identity: any;
    public token: string;
    public status: string;
    public total: any;
    public pages: any;
    public users: User[];
    public user: User;
    public follows: Follow[];
    public following: Follow[];
    public url: string;
    public page: number;
    public user_page_id: string;

    /* Datos para la paginación */
    public nextPage: number;
    public prevPage: number;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _userService: UserService,
        private _followService: FollowService
    ){
        this.title = 'Siguiendo';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = Global.url;
    }

    ngOnInit(){
        this.actualPage();
    }

    getUser(userId, page){
        this._userService.getUser(userId).subscribe(
            response => {
                if(!response.user) this._router.navigate(['/home']);
                this.user = response.user;
                  /* Devolver el listado de usuarios */
                this.getFollows(userId, page);
            },
            error => {
                var errorMessage = <any>error;
                if(errorMessage != null){
                    this.status = 'error';
                }
            }
        );
    }

    actualPage(){
        this._route.params.forEach((params:  Params) => {
            let userId = params['id'];
            this.user_page_id = userId;
            let page = +params['page'];
            this.page = page // Importante para userlo en el componente en la condición de la paginación

            if(!params['page']) page = 1;

            if(!page){
                page = 1;
            } else {
                this.nextPage = page + 1;
                this.prevPage = page - 1;

                if(this.prevPage <= 0){
                    this.prevPage = 1;
                }
            }

            this.getUser(userId, this.page);

        });
    }

    getFollows(user_id, page){
        this._followService.getFollowing(this.token, user_id, page).subscribe(
            response => {
                if(!response.follows) this.status = 'error';
               
                this.total = response.total;
                this.pages = response.pages;
                this.following = response.follows;
                this.follows = response.users_following;
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
                    console.log(err);
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
                    console.log(err);
                    this.status = 'error';
                }
            }
        );
    }



}