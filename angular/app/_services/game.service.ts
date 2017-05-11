import { FormControl, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Router } from '@angular/router';
import { Routes, RouterModule } from '@angular/router';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class GameService {
    private creatorName = '';
    private creatorAvatar:any;
    private player2Name = '';
    private player2Avatar: any;
    private player3Name = '';
    private player3Avatar: any;
    private player4Name = '';
    private player4Avatar: any;
    public authToken:string = sessionStorage.getItem('id_token');
    private Path: string;


    
constructor(public router: Router, private http: Http){}
    
     setPlayer2NameAndAvatar(name: any, avatar: any) {
        this.player2Name = name;
        this.player2Avatar = avatar;
    }

    getPlayer2Name(){
        return this.player2Name;
    }

    getPlayer2Avatar() {
        return this.player2Avatar;
    }

     setPlayer3NameAndAvatar(name: any, avatar: any) {
        this.player3Name = name;
        this.player3Avatar = avatar;
    }

    getPlayer3Name(){
        return this.player3Name;
    }

    getPlayer3Avatar(){
        return this.player3Avatar;
    }

     setPlayer4NameAndAvatar(name: any, avatar: any) {
        this.player4Name = name;
        this.player4Avatar = avatar;
    }

    getPlayer4Name(){
        return this.player4Name;
    }

    getPlayer4Avatar() {
        return this.player4Avatar;
    }


    setCreatorNameAndAvatar(creator: any, avatar: any) {
        this.creatorName = creator;
        this.creatorAvatar = avatar;
    
    }

    getCreatorName(){
        return this.creatorName;
    }

    getCreatorAvatar(){
        return this.creatorAvatar;
    }

    hasPlayer2(){
        if(this.player2Name=='') {

            return false;
        }
        return true;
    }
    hasPlayer3(){
        if(this.player3Name=='') {
            
            return false;
        }
        return true;
    }
    hasPlayer4(){
        if(this.player4Name=='') {
            
            return false;
        }
        return true;
    }
    updateGame(body: any, gameId: any) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'bearer ' + this.authToken);
        this.http.put(this.Path + 'games/' + gameId, body, <RequestOptionsArgs>{ headers: headers, withCredentials: false })
            .subscribe(
            response => {
                this.router.navigate(['board', gameId]);

            },
            error => {
                alert(error.text());
                console.log(error.text());
            }
            );

    }

    
}






