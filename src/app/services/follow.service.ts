import { Injectable } from '@angular/core';
import { Follow } from '../models/follow';
import { Global } from './global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class FollowService {
    public url: string;
    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    // Seguir a un usuario
    addFollow(follow: Follow, token: string): Observable<any>{
        let params = JSON.stringify(follow);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.post(this.url + 'api/save-follow', params, {headers: headers});
    }

    // Dejar de seguir un usuario
    deleteFollow(id: string, token: string): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.delete(this.url + 'api/delete-follow/' + id, {headers: headers});
    }

    // Obtener todos los usuarios que una persona sigue
    getFollowing(token: string, id = null, page): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        var url = this.url + 'api/following';
        if(id != null){
            url = this.url + 'api/following/'+id+'/'+page;
        }
        return this._http.get(url, {headers: headers});
    }

    // Obtener todos los seguidores de un usuario
    getFollowed(token: string, id = null, page): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        var url = this.url + 'api/followed';
        if(id != null){
            url = this.url + 'api/followed/'+id+'/'+page;
        }
        return this._http.get(url, {headers: headers});
    }
}