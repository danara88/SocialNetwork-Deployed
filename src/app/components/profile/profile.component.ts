import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';
import { UserService } from '../../services/user.service';
import { FollowService } from '../../services/follow.service';
import { User } from '../../models/user';
import { Follow } from '../../models/follow';

@Component({
    selector: "profile",
    templateUrl: "./profile.component.html",
    providers: [ UserService, FollowService ]
})

export class ProfileComponent implements OnInit{
    public title: string;
    public user: User;
    public status: string;
    public url: string;
    public stats: any;
    public identity: any;
    public token: any;
    public follow: Follow;
    public following: boolean;
    public followed: boolean;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _userService: UserService,
        private _followService: FollowService
    ){
        this.title = "Perfil";
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.stats = this._userService.getStats();
        this.url = Global.url;
    }

    // Carga del componente
    ngOnInit(){
        this.loadPage();
    }

    // Método para sacar los valores de la url
    loadPage(){
        this._route.params.forEach((params: Params) => {
            let id = params['id'];

            this.getUser(id);
            this.getCounters(id);
        });
    }

    // Obtener los datos del usuario
    getUser(id){
        this._userService.getUser(id).subscribe(
            response => {
                if(response.user){
                    this.user = response.user;
                   
                    // Comprobar si sigo al usuario
                    if(response.following && response.following._id){
                        this.following = true;
                    } else {
                        this.following = false;
                    }

                    if(response.following && response.followed._id){
                        this.followed = true;
                    } else {
                        this.followed = false;
                    }
                } else {
                    this.status = 'noResults';
                }
            },
            error => {
                let err = <any>error;
                if(err != null) this.status = 'error';
                this._router.navigate(['/perfil', this.identity._id]); // Devolvemos a la pagina de perfil del propio usuario
            }
        );
    }

    // Obtener los contadores del perfil o del usuario
    getCounters(id){
        this._userService.getCounters(id).subscribe(
            response => {
                this.stats = response;
            },
            error => {
                let err = <any>error;
                if(err != null) this.status = 'error';
            }
        );
    }

    // Seguir al usuario
    followUser(followed){
        var follow = new Follow('', this.identity._id, followed);
        this._followService.addFollow(follow, this.token).subscribe(
            response => {
                this.following = true;
            },
            error => {
                let err = <any>error;
                if(err != null) this.status = 'error';
            }
        );
    }

    // Dejar de seguir un usuario
    unfollowUser(followed){
        this._followService.deleteFollow(followed, this.token).subscribe(
            response => {
                this.following = false;
            },
            error => {
                let err = <any>error;
                if(err != null) this.status = 'error';
            }
        );
    }

    // Funcionalidades para el boton
    public followUserOver: any;
    mouseEnter(user_id){
        this.followUserOver = user_id;
    }
    mouserLeave(){
        this.followUserOver = 0;
    }

    linkToFollowing(){
        this._router.navigate(['/siguiendo', this.user._id, 1]);
    }

    linkToFollowed(){
        this._router.navigate(['/seguidores', this.user._id, 1]);
    }
}