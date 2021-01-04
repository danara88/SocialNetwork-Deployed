import { Injectable } from '@angular/core';
import { Publication } from '../models/publication';
import { Global } from './global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class PublicationService {
    public url: string;
    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    // Crear nueva publicación
    addPublication(token: string, publication: Publication): Observable<any>{
        let params = JSON.stringify(publication);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.post(this.url + 'api/save-publication', params, {headers: headers});
    }

    // Obtener las publicaciones
    getPublications(token: string, page = 1): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', token);
        return this._http.get(this.url + 'api/publications/' + page, {headers: headers});
    }

    // Obtener publicaciones de un usuario
    getPublicationsUser(token: string, id: string, page = 1):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.get(this.url + 'api/publications-user/' + id + '/' + page, {headers: headers});
    }

    // Eliminar una publicación
    deletePublication(token: string, id: string): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', token);
        return this._http.delete(this.url + 'api/delete-publication/' + id, {headers: headers});
    }

}