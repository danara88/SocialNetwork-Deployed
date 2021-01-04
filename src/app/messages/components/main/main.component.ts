import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'main-selector',
    templateUrl: './main.component.html'
})

export class MainComponent implements OnInit{
    public title: string;
    constructor(){
        this.title = 'Mensajes privados';
    }
    ngOnInit(){
        console.log('Main de mensajes cargado');
    }
}