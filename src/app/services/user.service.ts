import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Global } from './global';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class UserService {
	public url: string;
	public identity: any;
	public token: string;
	public stats: any;
	
	constructor(
		private _http: HttpClient
	){
		this.url = Global.url;
	}

	// Obtener la identidad del usuario del localStorage
	getIdentity(){
		let identity = JSON.parse(localStorage.getItem('identity')); // JSON.parse -> transforma a un objeto usable desde un json string
		if(identity !=  'undefined'){
			this.identity = identity;
		} else {
			this.identity = null;
		}

		return this.identity;
	}

	// Obtener el token del localStorage
	getToken(){
		let token = localStorage.getItem('token');
		if(token != 'undefined'){
			this.token = token;
		} else {
			this.token = null;
		}
		return this.token;
	}

	// Obtener las estadisiticas del localStorage
	getStats(){
		let stats = JSON.parse(localStorage.getItem('stats'));
		if(stats == 'undefined'){
			this.stats = null;
		}  else {
			this.stats = stats;
		}
		return this.stats;
	}

	// Metodo para registrar al usuario
	register(user: User): Observable<any>{
		let params = JSON.stringify(user); // Un json convertido en string
		let headers = new HttpHeaders().set('Content-Type','application/json');
		return this._http.post(this.url + 'api/save-user', params, {headers: headers});
	}

	// Metodo de iniciar sesión al usuario
	signUp(userToLogin, getToken = null): Observable<any>{
		if(getToken != null){
			userToLogin.getToken = getToken; // Le mandamos por body getToken
		}

		let params = JSON.stringify(userToLogin);
		let headers = new HttpHeaders().set('Content-Type','application/json');
		return this._http.post(this.url + 'api/login', params, {headers: headers});
	}

	// Conseguir estadísticas del usuario
	getCounters(userId = null): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
			.set('Authorization', this.getToken());
		if(userId != null){
			return this._http.get(this.url + 'api/counters/' + userId, {headers: headers});
		}
		return this._http.get(this.url + 'api/counters', {headers: headers});
	}

	// Actualizar datos del usuario
	updateUser(user: User): Observable<any>{
		let params = JSON.stringify(user);
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
			.set('Authorization', this.getToken());
		return this._http.put(this.url + 'api/update-user/' + user._id, params, {headers: headers});
	}

	// Obtener los usuarios paginados
	getUsers(page = null): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
			.set('Authorization', this.getToken());
		return this._http.get(this.url + 'api/users/' + page, {headers: headers});
	}

	// Obtener solo UN usuario para la construcción de perfil de usuario
	getUser(id: string): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
			.set('Authorization', this.getToken());
		return this._http.get(this.url + 'api/user/' + id, {headers: headers});
	}
}
