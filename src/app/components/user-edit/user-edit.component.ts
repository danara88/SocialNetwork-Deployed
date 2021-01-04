import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';

@Component({
    selector: 'user-edit',
    templateUrl: './user-edit.component.html',
    providers: [ UserService, UploadService ]
})

export class UserEditComponent implements OnInit {
    public title: string;
    public identity: any;
    public token: string;
    public user: User;
    public status: string;
    public url: string;
    constructor(
        private _userService: UserService,
        private _uploadService: UploadService
    ){
        this.title = "Editar mi información";
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.user = this.identity; // cargar los datos del usuario
        this.url = Global.url;
    }

    ngOnInit(){
       
    }

    // Método ha ejecutar desde el formulario para actualizar la información del usuario
    onSubmit(){
       this._userService.updateUser(this.user).subscribe(
           (response: any) => {
                if(response.user){
                    this.status = "success";
                    localStorage.setItem('identity', JSON.stringify(this.user));
                    this.identity = this.user;

                    // SUBIDA DE IMAGEN DE USUARIO
                
                    this._uploadService.makeFileRequest(this.url+'api/upload-image-user/' + this.user._id, [], this.filesToUpload, this.token, 'image')
                        .then((result: any) => {
                            console.log(result); // El resultado e sel nombre de la imagen guardada
                            this.user.image = result.user.image;
                            localStorage.setItem('identity', JSON.stringify(this.user)); // Volvemos a actualizar 
                            var image = document.getElementById('profileImage');
                            // image.setAttribute("src", this.url + 'api/get-image-user/' + this.identity.image);
                        }).catch((err) => {
                            console.log(err);
                        });

                } else {
                    this.status = "error";
                }
           },
           error => {
               var errorMessage = <any>error;
               console.log(errorMessage);

               if(errorMessage != null){
                   this.status = "errorServer";
               }
           }
       );
    }

    // Función para cerrar las alertas
    closeMessage(){ this.status = null; }

    // Método para recoger el archivo/imagen del formulario
    public filesToUpload: Array<File>;
    fileChangeEvent(fileInput: any){  // fileInput -> $event
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);
    }
}