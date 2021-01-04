import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Publication } from '../../models/publication';
import { Global } from '../../services/global';
import { PublicationService } from '../../services/publication.service';
import { UploadService } from '../../services/upload.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: "sidebar",
    templateUrl: "./sidebar.component.html",
    providers: [ UserService, PublicationService, UploadService ]
})

export class SidebarComponent implements OnInit {
    public identity: any;
    public token: string;
    public stats: any;
    public url: string;
    public status: string;
    public publication: Publication;


    constructor(
        private _userService: UserService,
        private _publicationService: PublicationService,
        private _uploadService: UploadService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.stats = this._userService.getStats();
        this.url = Global.url;
        this.publication = new Publication('',this.identity._id,'','','');
    }

    ngOnInit(){
    }

    onSubmit(form, event){
        this._publicationService.addPublication(this.token, this.publication).subscribe(
            response => {
                if(response.publication){

                    // Comprobar si hay un archivo subido o elegido por el usuario
                    if(this.filesToUpload && this.filesToUpload.length){
                            // Subida del archivo en la publicacion
                            this._uploadService.makeFileRequest(this.url + 'api/upload-image-publication/' +  response.publication._id, [], this.filesToUpload, this.token, 'image')
                                    .then((result: any) => {
                                        this.publication.file = result.image;
                                        this.sent.emit({ send: 'true' }); // send -> propiedad El event es solo para capturar el send: true
                                        this.status = 'success';
                                        this.publication = response.publication;
                                        form.reset();
                                        this._router.navigate(['/timeline']);

                                    });

                    } else {
                        this.status = 'success';
                        form.reset();
                        this.sent.emit({ send: 'true' }); // send -> propiedad El event es solo para capturar el send: true
                        this._router.navigate(['/timeline']);
                    }
                } else {
                    this.status = 'noResults';
                }
            },
            error => {
                var err = <any>error;
                if(err != null){
                    console.log(err);
                    this.status = 'error';
                }
            }
        );
       
    }

    public filesToUpload: Array<File>;
    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }


     // Output
     @Output() sent = new EventEmitter(); // Propiedad que va a poder emitir eventos o lanzar eventos
     sendPublication(event){
        console.log(event);
        this.sent.emit({ send: 'true' }); // send -> propiedad El event es solo para capturar el send: true
     }

    closeMessage(){ this.status = null; }

    linkToFollowing(){
        this._router.navigate(['/siguiendo', this.identity._id, 1]);
    }

    linkToFollowed(){
        this._router.navigate(['/seguidores', this.identity._id, 1]);
    }

    linkToProfile(){
        this._router.navigate(['/perfil', this.identity._id]);
    }
}