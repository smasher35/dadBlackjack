import { Component } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { router } from "./app.router";
import { AuthenticationService } from "./_services/authentication.service";

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: `app.component.html`
})
export class AppComponent { 
    /**
     *
     */
    constructor(public authenticationService: AuthenticationService) {
        
        
    }

    isLogged(){
        return this.authenticationService.isLoggedIn();
    }
    logout(){
        this.authenticationService.logout();
    }
}