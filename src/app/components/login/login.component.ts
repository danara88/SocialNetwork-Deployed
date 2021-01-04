import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
	selector: "login",
	templateUrl: "./login.component.html",
	providers: [ UserService ]
})

export class LoginComponent implements OnInit{
	public user: User;
	public status: string;
	public identity: any;

	constructor(
		private _router: Router,
		private _userService: UserService
	){
		this.user = new User('','','','','','','ROLE_USER','');
	}

	ngOnInit(){
	}

	// Metodo para dejar entrar al usuario
	onSubmit(){
		this._userService.signUp(this.user).subscribe(
			(response: any) => {
				if(response.user){
					this.identity = response.user;
					if(this.identity._id){

						//Persistir en localStorage
						localStorage.setItem('identity', JSON.stringify(this.identity));

						// Obtener el token y continuar con el proceso
						this.getToken();


					} else {
						this.status = "failNoResults";
					}

				} else {
					this.status = "failNoResults";
					
				}
			},
			error => {
				var errorMessage = <any>error;
				console.log(errorMessage);
				if(errorMessage != null){
					this.status = "fail";
					
				}
			}

		);
	}

	// Obtener el token al iniciar sesión
	getToken(){
		this._userService.signUp(this.user, "true").subscribe(
				response => {
					let token = response.token;
					if(token.length <= 0){
						this.status = "fail";
					} else {

						// Persistir el token en la sesión
						localStorage.setItem('token', token);
						
						// Sacar estadisticas 
						this.getCounters();

					}
				},
				error => {
				var errorMessage = <any>error;
				console.log(errorMessage);
				if(errorMessage != null){
					this.status = "fail";
				}
			}

		);
	}

	// Obtener las estadísticas del usuario
	getCounters(){
		this._userService.getCounters().subscribe(
			response => {
				localStorage.setItem('stats', JSON.stringify(response));
				
				this.status = "success";
				this._router.navigate(['/timeline']);
			},
			error => {
				console.log(<any>error);
			}
		);
	}
	



	closeMessage(){ this.status = null; }
} 