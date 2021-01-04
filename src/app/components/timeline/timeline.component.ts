import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';
import { Publication } from '../../models/publication';
import { UserService } from '../../services/user.service';
import { PublicationService } from '../../services/publication.service';
declare var $: any;

@Component({
    selector: "timeline",
    templateUrl: "./timeline.component.html",
    providers: [ UserService, PublicationService ]
})

export class TimelineComponent implements OnInit{
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
        this.title = "Timeline";
        this.page = 1;
    }

    ngOnInit(){
        $(document).ready(function(){
            $(".trashBtn").click(function(){console.log('Hola')});
        });
        this.getPublications(this.page);
       
    }

   getPublications(page, adding = false){
        this._publicationService.getPublications(this.token, page).subscribe(
            response => {
               if(response.publications){
                   this.pages = response.pages; 
                   this.total = response.total_items; 
                   this.itemsPerPage = response.items_per_page; 

                   if(!adding){
                    this.publications = response.publications;
                   } else if(!this.noMore){
                       var arrayA = this.publications; // Pagina   1
                       var arrayB = response.publications; // pagina 2
                       this.publications = arrayA.concat(arrayB);
        

                       // animacion para mostrar mas publicaciones con animacion
                       $("html, body").animate({ scrollTop: $('body').prop("scrollHeight") }, 500);

                       // Volver a ejecutar para actualizar la variable no more
                       if(this.publications.length == this.total){
                           this.viewMore();
                       }
                   }

                   // Volver a ejecutar para actualizar la variable no more
                       if(this.publications.length == this.total){
                           this.viewMore();
                       }

                 

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
   public noMore = false; 
   viewMore(){
        if(this.publications.length == this.total){
            this.noMore = true; // No cargues más publicaciones
        } else {
            this.page += 1; // Sumo 1 en la pagina actual para que el siguiente click cargue la otra pagina
            this.getPublications(this.page, true);
        }
       
   }

   public showImage: any;
   showThisImage(user_id){
       this.showImage = user_id;
   }
   hideThisImage(){
       this.showImage = 0;
   }

   // Refrescar las publicaciones cuando se sube un publicacion del mismo usuario
   refresh(event = null){
        console.log(event); // Recivo la propiedad send: true 
        this.getPublications(1); // Volver a cargar las publicaciones
   }

   public show: string;
   showModal(id){
    this.show = id;
   }

   deletePublication(id){
       this._publicationService.deletePublication(this.token, id).subscribe(
           response => {
                this.refresh();
           },
           error => {
                var err = <any>error;
                if(err != null){
                    this.status = 'error';
                }
           }
       );
   }
}