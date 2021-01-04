import { Injectable } from '@angular/core';
import { Global } from './global';
import { promise } from 'protractor';

@Injectable()
export class UploadService { 
    public url: string;

    constructor(){
        this.url = Global.url;
    }

    makeFileRequest(url: string, params: Array<string>, files: Array<File>, token: string, name: string){
        return new Promise(function(resolve, reject){
            var formData: any = new FormData(); // Simulamos un formulario
            var xhr = new XMLHttpRequest();

            // Recorremos los ficheros del arreglo
            for(var i=0; i<files.length; i++){
                formData.append(name, files[i], files[i].name);
            }

            // Hacer petición ajax
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.response)); // Hacerme la eejcucion de esto correctamente
                    } else {
                        reject(xhr.response); // No dejar hacer la petición ajax
                    }
                }
            }

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', token);
            xhr.send(formData);

        });
    }

}