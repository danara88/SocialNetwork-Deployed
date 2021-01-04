import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { Global } from './services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ UserService ]
})
export class AppComponent implements OnInit, DoCheck {
	public token: string;
	public identity: any;
	public url: string;

	constructor(
		private _userService: UserService,
		private _router: Router,
		private _route: ActivatedRoute
	){
		this.url = Global.url;
	}

	ngOnInit(){
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
	}

	// Cada vez que se hacen nuevos cambios actualizame las variables que estan dentro del metodo
	// Vuelve a ejecutar (segundo plano)
	ngDoCheck(){
		this.identity = this._userService.getIdentity(); // Velve a cargar todo (Ejecuta la linea)
	}

	logOut(){
		localStorage.clear();
		this.identity = null;
		this._router.navigate(['/login']);
	}

}
