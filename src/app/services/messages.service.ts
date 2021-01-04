import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '../models/message';
import { Global } from './global';
import { Observable } from 'rxjs/observable';

@Injectable()
export class MessageService {
    public url: string;
    constructor( private _http: HttpClient ){
        this.url = Global.url;
    }

    // Enviar mensaje
    addMessage(message: Message, token: string): Observable<any>{
        let params = JSON.stringify(message);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.post(this.url + 'api/save-message', params, {headers: headers});
    }

    // Listar los mensajes recibidos
    getMyMessages(token: string, page = 1): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', token);
        return this._http.get(this.url + 'api/my-messages/' + page, {headers: headers});
    }

    // Listar los mensajes emitidos
    getEmmitMessages(token: string, page = 1): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.get(this.url + 'api/messages/' + page, {headers: headers});
    }

    // Saca todos los usuarios que me siguen
    getMyFollows(token): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.get(this.url + 'api/get-my-follows/true', {headers: headers});
    }

}