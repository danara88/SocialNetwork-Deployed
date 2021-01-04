import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';
import { Publication } from '../../models/publication';
import { UserService } from '../../services/user.service';
import { PublicationService } from '../../services/publication.service';
declare var $: any;

@Component({
    selector: "publications",
    templateUrl: "./publications.component.html",
    providers: [ UserService, PublicationService ]
})

export class PublicationsComponent implements OnInit{
    public title: string;
    public identity: any;
    public token: string;
    public url: string;
    public status: string;
    public publication: Publication;
    public publications: Publication[];
    public page: number;
    public pages: any;
    public total: any;
    public itemsPerPage: any;
    // Input
    @Input() userId: string;
    constructor(
        private _userService: UserService,
        private _publicationService: PublicationService,
        private _router: Router,
        private _route: ActivatedRoute
    ){
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = Global.url;
        this.publication = new Publication('',this.identity._id,'','','');
        this.title = "Publicaciones";
        this.page = 1;
    }

    ngOnInit(){
        this.getPublications(this.page, this.userId);
    
    }

    getPublications(page, userId, adding = false){
        this._publicationService.getPublicationsUser(this.token, userId, page).subscribe(
            response => {
               if(response.publications){
                   this.pages = response.pages; 
                   this.total = response.total_items; 
                   this.itemsPerPage = response.items_per_page; 

                   if(!adding){
                    this.publications = response.publications;
                    if(this.page == this.pages) this.viewMore();
                    
                   } else{
                       var arrayA = this.publications; // Pagina   1
                       var arrayB = response.publications; // pagina 2
                      
                       this.publications = arrayA.concat(arrayB);

                       // animacion para mostrar mas publicaciones con animacion
                       $("html,body").animate({ scrollTop: $('html').prop("scrollHeight") }, 500);

                       // Volver a ejecutar para actualizar la variable no more
                        if(this.publications.length == this.total){
                            this.viewMore();
                        }

                   }
                   // Redireccionamiento
                   /*if(page > this.pages){
                       this._router.navigate(['/home']);
                   }*/

               } else {
                   this.status = "noResults";
               }
            },
            error => {
                var err = <any>error;
                if(err != null){
                    this.status = 'error';
                }
            }
        );
   }

   // Ver mas publicaciones por la paginación hacia abajo
   public noMore = false;
   viewMore(){
    // Para ocultar el boton ver cargar mas publicaciones
    if(this.page == this.pages){
        this.noMore = true;
    }  else {
        this.page += 1; // Sumo 1 en la pagina actual para que el siguiente click cargue la otra pagina
        this.getPublications(this.page, this.userId, true);
    }
   
}


}