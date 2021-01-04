import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
	selector: "register",
	templateUrl: "./register.component.html",
	providers: [ UserService ]
})

export class RegisterComponent implements OnInit{
	public user: User;
	public status: string;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private _userService: UserService
	){
		this.user = new User('','','','','','','ROLE_USER','');
	}

	ngOnInit(){
		
	}

	onSubmit(form){
		this._userService.register(this.user).subscribe(
			response => {
				if(response.user && response.user._id){
					console.log(this.user);
					this.status = 'success';
				} else {
					console.log(response.message);
					this.status = 'failNoResults';
				}
			},
			error => {
				console.log(<any>error);
				this.status = 'fail'
			}
		);
		form.reset();
	}










	closeMessage(){ this.status = null; }

}